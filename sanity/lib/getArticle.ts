import { client } from "./client";
import { groq } from "next-sanity";

export async function getArticle(slug: string): Promise<Overview> {
	const query = groq`*[_type == "overview" && slug.current == $slug][0] {
		_id,
		bannerImage,
		title,
		slug,
		mainImage,
		editoText,
		sections[]{
			proposition180 {
			  pictoImage,
			  question->{
				questionText
			  }
			},
			subsections[]{
			  title,
			  contents[]->{
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
				alt
			  }
			}
		},
		questions {
		  image,
		  questions[]->{
			_id,
			questionText
		  }
		},
		publishedAt
	  }`;

	const article: Overview = await client.fetch(query, { slug });

	return article;
}
