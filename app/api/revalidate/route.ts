import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
	const path = request.nextUrl.searchParams.get("path") || "/";
    const tag = request.nextUrl.searchParams.get("tag");
	const secret = request.nextUrl.searchParams.get("secret");

	if (secret !== process.env.REVALIDATE_TOKEN) {
		return NextResponse.json(
			{
				message: "Invalid revalidation token !",
			},
			{ status: 401 }
		);
	}

    // if (!tag) {
    //     return NextResponse.json(
	// 		{
	// 			message: "Revalidation tag missing !",
	// 		},
	// 		{ status: 401 }
	// 	);
    // }

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
