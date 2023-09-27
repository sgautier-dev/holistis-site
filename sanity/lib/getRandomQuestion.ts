import { client } from "./client";

export async function getRandomQuestion(): Promise<BasicQuestion> {
	try {
		const query = '*[_type == "question"] {questionText}';
		const questions: BasicQuestion[] = await client.fetch(query);

		if (!questions.length) {
			throw new Error("No questions found");
		}

		const randomIndex = Math.floor(Math.random() * questions.length);
		return questions[randomIndex];
	} catch (error) {
		console.error("Error fetching question:", error);
		return {
			//default question in case of error
			category: "180°",
			questionText:
				"ET SI LE TEMPS LONG ÉTAIT TOUT aussi IMPORTANT QUE LE TEMPS COURT ?",
		};
	}
}
