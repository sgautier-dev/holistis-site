import { defineField, defineType } from "sanity";

export default defineType({
	name: "question",
	title: "Questions",
	type: "document",
	fields: [
		defineField({
			name: "questionText",
			title: "Texte de la question",
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
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
	],
});
