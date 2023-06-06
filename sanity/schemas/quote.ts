import { defineField, defineType } from "sanity";

export default defineType({
	name: "quote",
	title: "Citations",
	type: "document",
	fields: [
		defineField({
			name: "quoteText",
			title: "Texte de la citation",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
        defineField({
			name: "quoteAuthor",
			title: "Auteur de la citation",
			type: "string",
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
});
