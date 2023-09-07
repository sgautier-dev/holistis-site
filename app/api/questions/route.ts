import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

/*
Questions route: It fetches a list of questions from a database and returns them as a JSON response. 
If there is an error during the fetching process, it logs the error and returns a default question as a fallback response.
*/
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const query =
			'*[_type == "question"] { questionText, "category": categories[0]->title }';
		const questions = await client.fetch(query);

		return NextResponse.json(questions);
	} catch (error) {
		logger.error("Error fetching questions:", error);
		return NextResponse.json([
			{
				// default question in case of error
				category: "180°",
				questionText:
					"ET SI LE TEMPS LONG ÉTAIT TOUT aussi IMPORTANT QUE LE TEMPS COURT ?",
			},
		]);
	}
}
