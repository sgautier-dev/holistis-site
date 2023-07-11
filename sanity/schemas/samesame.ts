import { defineField, defineType } from "sanity";

export default defineType({
	name: "samesame",
	title: "Same Same",
	type: "document",
	fields: [
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Texte alternatif",
					description: "Décrivez l'image.",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "title",
			title: "Titre de l'image",
			type: "string",
            validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "text",
			title: "Texte",
			type: "blockContent",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "categories",
			title: "Catégories de l'image",
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
