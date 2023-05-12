import { defineField, defineType } from "sanity";

export default defineType({
	name: "overview",
	title: "Overview",
	type: "document",
	fields: [
		defineField({
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
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "title",
			title: "Titre",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
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
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "editoText",
			title: "Texte édito",
			type: "blockContent",
		}),
		defineField({
			name: "proposition180",
			type: "object",
			title: "Proposition 180",
			fields: [
				{ name: "pictoImage", type: "image", title: "Image picto" },
				{
					name: "question",
					type: "reference",
					to: [{ type: "question" }],
					title: "Question",
				},
			],
		}),
		defineField({
			name: "contents",
			type: "array",
			of: [{ type: "reference", to: [{ type: "resource" }] }],
			title: "Contenus",
		}),
		defineField({
			name: "questions",
			type: "object",
			title: "Questions",
			fields: [
				{ name: "image", type: "image", title: "Image" },
				{
					name: "questions",
					type: "array",
					of: [{ type: "reference", to: [{ type: "question" }] }],
					title: "Questions",
				},
			],
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
		defineField({
			name: "publishedAt",
			title: "Publié le",
			type: "datetime",
		}),
	],

	preview: {
    select: {
      title: 'title',
      media: 'bannerImage',
    },
  },
});
