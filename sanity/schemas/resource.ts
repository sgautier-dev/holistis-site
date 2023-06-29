import { defineField, defineType } from "sanity";

export default defineType({
	name: "resource",
	title: "Ressources",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Titre",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		{
			name: "picto",
			title: "Picto",
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
			name: "duration",
			title: "Durée",
			type: "string",
		}),
		defineField({
			name: "body",
			title: "Texte",
			type: "blockContent",
			validation: (Rule) => Rule.required(),
		}),
		{
			name: "mediaType",
			type: "string",
			title: "Type de media",
			options: {
				list: [
					{ title: "Web", value: "web" },
					{ title: "Vidéo", value: "video" },
					{ title: "Image", value: "image" },
					{ title: "Doc", value: "doc" },
					// Add more options as needed...
				],
				layout: "radio", // or 'dropdown'
			},
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "media",
			title: "URL du Media",
			type: "url",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "alt",
			type: "string",
			title: "Texte alternatif du Media",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "picto",
		},
	},
});
