import { defineField, defineType } from "sanity";

export default defineType({
	name: "overview",
	title: "Overview",
	type: "document",
	fields: [
		{
			name: "bannerImage",
			title: "Image bandeau",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Texte alternatif",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "title",
			title: "Titre de l'article",
			type: "string",
		}),
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "mainImage",
			title: "Image principale",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Texte alternatif",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "editoText",
			title: "Texte édito",
			type: "blockContent",
			validation: (Rule) => Rule.required(),
		}),
		{
			name: "sections",
			title: "Sections",
			type: "array",
			of: [
				{
					name: "section",
					title: "Rubrique",
					type: "object",
					fields: [
						{
							name: "proposition180",
							title: "Proposition 180",
							type: "object",
							fields: [
								{
									name: "pictoImage",
									type: "image",
									title: "Image picto",
									initialValue: {
										_type: "image",
										asset: {
											_type: "reference",
											_ref: "image-5413934381884f698c86cf648e9bccfccb2a3202-90x96-gif",
											//_id of the image found by running this query in the studio Vision:
											// *[_type == "sanity.imageAsset"]{
											// 	_id,
											// 	originalFilename
											//   }
										},
									},
									validation: (Rule) => Rule.required(),
								},
								{
									name: "question",
									type: "reference",
									to: [{ type: "question" }],
									title: "Question",
									validation: (Rule) => Rule.required(),
								},
							],
							validation: (Rule) => Rule.required(),
						},
						{
							name: "subsections",
							type: "array",
							title: "Sous-thèmes",
							of: [
								{
									name: "subsection",
									title: "Sous-thème",
									type: "object",
									fields: [
										defineField({
											name: "title",
											title: "Title",
											type: "string",
										}),
										defineField({
											name: "contents",
											type: "array",
											of: [{ type: "reference", to: [{ type: "resource" }] }],
											title: "Contenus",
											validation: (Rule) => Rule.required(),
										}),
										// Other fields for the "subsection" type
									],
								},
							],
							validation: (Rule) => Rule.required(),
						},
					],
					preview: {
						select: {
							title: "proposition180.question.questionText",
							media: "proposition180.pictoImage",
						},
					},
				},
			],
			validation: (Rule) => Rule.required(),
		},

		{
			name: "questions",
			type: "object",
			title: "Questions",
			fields: [
				{
					name: "image",
					type: "image",
					title: "Image",
					initialValue: {
						_type: "image",
						asset: {
							_type: "reference",
							_ref: "image-d15dcccd491e24e7295882e127ceb91b292d8aaa-120x120-png",
						},
					},
				},
				{
					name: "questions",
					type: "array",
					of: [{ type: "reference", to: [{ type: "question" }] }],
					title: "Questions",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "categories",
			title: "Catégories  de l'article",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) => Rule.required(),
		}),
		{
			name: "publishedAt",
			title: "Publié le",
			type: "date",
			validation: (Rule) => Rule.required(),
		},
	],
});

// {
// 	name: "proposition180",
// 	type: "object",
// 	title: "Proposition 180",
// 	fields: [
// 		{
// 			name: "pictoImage",
// 			type: "image",
// 			title: "Image picto",
// 			initialValue: {
// 				_type: "image",
// 				asset: {
// 					_type: "reference",
// 					_ref: "image-5413934381884f698c86cf648e9bccfccb2a3202-90x96-gif",
// 					//_id of the image found by running this query in the studio Vision:
// 					// *[_type == "sanity.imageAsset"]{
// 					// 	_id,
// 					// 	originalFilename
// 					//   }
// 				},
// 			},
// 		},
// 		{
// 			name: "question",
// 			type: "reference",
// 			to: [{ type: "question" }],
// 			title: "Question",
// 		},
// 	],
// },
// {
// 	name: "contents",
// 	type: "array",
// 	of: [{ type: "reference", to: [{ type: "resource" }] }],
// 	title: "Contenus",
// 	validation: (Rule) => Rule.required(),
// },
