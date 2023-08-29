import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const query = '*[_type == "quote"] {quoteText, quoteAuthor}';
		const quotes: BasicQuote[] = await client.fetch(query);

		if (!quotes.length) {
			throw new Error("No quotes found");
		}

		return NextResponse.json(quotes);
	} catch (error) {
		logger.error("Error fetching quote:", error);
		return NextResponse.json([
			{
				//default quote in case of error
				quoteText:
					"On ne change jamais les choses en combattant la réalité existante. Pour changer quelque chose, construisez un nouveau modèle qui rendra inutile l’ancien.",
				quoteAuthor: "Richard Buckminster Fuller",
			},
		]);
	}
}
