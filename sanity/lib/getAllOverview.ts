import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllOverview(): Promise<Overview[]> {
	const query = groq`*[_type == "overview"] | order(publishedAt desc) {_id, title, slug, mainImage, publishedAt}`;
	const articles: Overview[] = await client.fetch(query);

	return articles;
}
