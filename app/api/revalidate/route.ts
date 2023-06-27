import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
	// to use with a webhook: http://localhost:3000/api/revalidate?secret=xxxxx
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
		return NextResponse.json({ revalidated: true, now: Date.now() });
	} catch (err) {
		return NextResponse.json(
			{
				message: "Error revalidating",
			},
			{ status: 500 }
		);
	}
}
