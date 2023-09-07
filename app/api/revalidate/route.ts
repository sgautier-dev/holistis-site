import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import logger from "@/lib/logger";

/*
Revalidate route: Triggered by a Sanity webhook. 
It retrieves path and secret from the search params. 
Revalidate on demand the provided path or root if not specified.
*/
export async function GET(request: NextRequest) {
	// to use with a webhook: http://localhost:3000/api/revalidate?path=/xxxx&secret=xxxxx
	const path = request.nextUrl.searchParams.get("path") || "/";
	const secret = request.nextUrl.searchParams.get("secret");

	if (secret !== process.env.REVALIDATE_TOKEN) {
		return NextResponse.json(
			{
				message: "Invalid revalidation token !",
			},
			{ status: 401 }
		);
	}

	try {
		revalidatePath(path);
		if (path === "/overview") {
			revalidatePath("/ressources");
		}
		return NextResponse.json({ revalidated: true, now: Date.now() });
	} catch (err) {
		logger.error(err);
		return NextResponse.json(
			{
				message: "Error revalidating",
			},
			{ status: 500 }
		);
	}
}
