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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "categories",
			title: "Catégories  de la question",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) => Rule.required(),
		}),
	],
});
