import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllOverview(): Promise<OverviewPreview[]> {
	const query = groq`*[_type == "overview"] {_id, title, slug, mainImage, publishedAt}`;
	const articles: OverviewPreview[] = await client.fetch(query);

	if (!articles.length) {
		throw new Error("No articles found");
	}

	return articles;
}
