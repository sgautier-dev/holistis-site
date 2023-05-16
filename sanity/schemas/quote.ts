import { defineField, defineType } from "sanity";

export default defineType({
	name: "quote",
	title: "Citation",
	type: "document",
	fields: [
		defineField({
			name: "quoteText",
			title: "Texte de la citation",
			type: "string",
		}),
        defineField({
			name: "quoteAuthor",
			title: "Auteur de la citation",
			type: "string",
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
	],
});
