import { defineField, defineType } from "sanity";

export default defineType({
	name: "resource",
	title: "Ressource",
	type: "document",
	fields: [
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
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "duration",
			title: "Durée",
			type: "string",
		}),
		defineField({
			name: "body",
			title: "Texte",
			type: "blockContent",
		}),
		{
			name: 'mediaType',
			type: 'string',
			title: 'Type de media',
			options: {
			  list: [
				{title: 'Web', value: 'web'},
				{title: 'Vidéo', value: 'video'},
				{title: 'Image', value: 'image'},
				// Add more options as needed...
			  ],
			  layout: 'radio', // or 'dropdown'
			}
		  },
		defineField({
			name: "media",
			title: "URL Media",
			type: "url",
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "picto",
		},
	},
});
