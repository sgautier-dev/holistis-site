import { NextResponse, NextRequest } from "next/server";
import rateLimit from "express-rate-limit";

const allowedOrigins = new Set(
	process.env.NODE_ENV === "production"
		? ["https://holistis.net", "https://www.holistis.net"]
		: ["http://localhost:3000"]
);
const allowedOriginsString = Array.from(allowedOrigins).join(", ");

const getKey = (req: Request) => {
	return req.headers.get("x-forwarded-for") || "unknown-ip";
};

const baseRateLimiter = rateLimit({
	keyGenerator: getKey,
	windowMs: 60 * 1000,
	max: 10,
});

const webhookRateLimiter = rateLimit({
	keyGenerator: getKey,
	windowMs: 60 * 1000,
	max: 100,
});

//rate limiting and origin checking for incoming requests
export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const webhookRegex = /^\/api\/(newsletter|revalidate)/;
	const isWebhookPath = webhookRegex.test(path);

	// Skip allowedOrigins check for routes triggered by tier webhooks
	if (!isWebhookPath) {
		const origin = request.headers.get("origin");
		if (origin && !allowedOrigins.has(origin)) {
			return new NextResponse(null, {
				status: 403,
				statusText: "Forbidden",
				headers: {
					"Content-Type": "text/plain",
					"Access-Control-Allow-Origin": allowedOriginsString,
				},
			});
		}
	}

	// Apply rate limiting based on the path
	let rateLimited: boolean = false;
	if (!isWebhookPath) {
		baseRateLimiter(request as any, {} as any, () => {
			rateLimited = true;
		});
	} else {
		webhookRateLimiter(request as any, {} as any, () => {
			rateLimited = true;
		});
	}

	if (rateLimited) {
		return new NextResponse(null, {
			status: 429,
			statusText: "Too Many Requests",
			headers: {
				"Retry-After": "60",
				"Content-Type": "text/plain",
			},
		});
	}

	return null;
}

export const config = {
	matcher: "/api/:path*",
};
