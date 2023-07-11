import { client } from "./client";
import { groq } from "next-sanity";

export async function getResources(): Promise<Resource[]> {
	const query = groq`*[_type == "resource"] | order(publishedAt desc) {
		_id,
		title,
		picto->{
			image,
			alt
			},
		duration,
		body,
		mediaType,
		media{
            ...,
            'mediaUrl': coalesce(webUrl, videoUrl, imageUrl.asset->url, docFile.asset->url, audioFile.asset->url)
            },
		alt,
        categories[]-> {
		  _id,
		  title,
		publishedAt},
	  }`;

	const contents: Resource[] = await client.fetch(query);

	return contents;
}
