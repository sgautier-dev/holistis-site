import { defineField, defineType } from "sanity";

export default defineType({
	name: "pictoImage",
	title: "Images Picto",
	type: "document",
	fields: [
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "alt",
			title: "Texte alternatif",
			description: "Décrivez le picto.",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
	],
});
