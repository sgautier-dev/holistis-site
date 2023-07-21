import { client } from "./client";

let lastQuestionIndex: number | null = null;
let questions: BasicQuestion[] | null = null;

export async function getRandomQuestion(): Promise<BasicQuestion> {
	try {
		// To improve perf check if the questions are already fetched, if not, fetch them
		if (!questions) {
			const query =
				'*[_type == "question"] { questionText, "category": categories[0]->title}';
			questions = await client.fetch(query);
		}

		if (!questions?.length) {
			throw new Error("No questions found");
		}

		let randomIndex;
		if (questions.length > 2) {
			do {
				randomIndex = Math.floor(Math.random() * questions.length);
			} while (randomIndex === lastQuestionIndex);
		} else {
			// to avoid infinite loop if there less than 3 questions in DB
			randomIndex = lastQuestionIndex === 0 ? 1 : 0;
		}

		lastQuestionIndex = randomIndex;

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
