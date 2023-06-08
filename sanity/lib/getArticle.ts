import { client } from "./client";
import { groq } from "next-sanity";

export async function getArticle(slug: string): Promise<Overview> {
	const query = groq`*[_type == "overview" && slug.current == $slug][0] {_id, bannerImage, title, slug, mainImage, editoText, proposition180 {
		pictoImage,
		question->{ questionText }
	  }, publishedAt}`;

	const article: Overview = await client.fetch(query, { slug });

	return article;
}
