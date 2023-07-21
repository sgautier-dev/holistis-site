import { defineField, defineType } from "sanity";

export default defineType({
	name: "resource",
	title: "Ressources",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Titre",
			type: "string",
		},
		{
			name: "picto",
			title: "Picto Image",
			type: "reference",
			to: [{ type: "pictoImage" }],
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
					{ title: "Audio", value: "audio" },
					// Add more options as needed...
				],
				layout: "radio", // or 'dropdown'
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "media",
			title: "Contenu du média",
			type: "object",
			fields: [
				{
					name: "webUrl",
					title: "Adresse URL",
					type: "url",
					hidden: ({ document }) => document?.mediaType !== "web",
				},
				{
					name: "videoUrl",
					title: "URL de la vidéo",
					type: "url",
					hidden: ({ document }) => document?.mediaType !== "video",
				},
				{
					name: "imageUrl",
					title: "Image",
					type: "image",
					options: {
						hotspot: true, // Enable hotspot selection for this field
					},
					hidden: ({ document }) => document?.mediaType !== "image",
				},
				{
					name: "docFile",
					title: "Document",
					type: "file",
					hidden: ({ document }) => document?.mediaType !== "doc",
				},
				{
					name: "audioFile",
					title: "Fichier audio",
					type: "file",
					hidden: ({ document }) => document?.mediaType !== "audio",
				},
			],
		},
		{
			name: "alt",
			title: "Texte alternatif",
			description:
				"Décrivez le contenu du média. Ou indiquez ce qui sera affiché s'il s'agit d'un lien web",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "categories",
			title: "Catégories  de la ressource",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "picto.image",
		},
	},
});
