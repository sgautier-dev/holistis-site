import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllOverview(): Promise<Overview[]> {
	const query = groq`*[_type == "overview"] | order(publishedAt desc) {_id, title, slug, mainImage, publishedAt,
		categories[]-> {
		  _id,
		  title
		}}`;
	const articles: Overview[] = await client.fetch(query, { next: { tags: ['overview'] } });

	return articles;
}
