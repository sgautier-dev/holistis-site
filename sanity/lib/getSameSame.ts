import { client } from "./client";
import { groq } from "next-sanity";

export async function getSameSame(): Promise<SameSame[]> {
	const query = groq`*[_type == "samesame"] | order(publishedAt desc) {
        _id, title, image, text, publishedAt,
		categories[]-> {
		  _id,
		  title
		}}`;
	const articles: SameSame[] = await client.fetch(query);

	return articles;
}
