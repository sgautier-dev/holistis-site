"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import QuestionModal from "./QuestionModal";
import { getRandomQuestion } from "@/sanity/lib/getRandomQuestion";

export default function QuestionButton() {
	const [isQuestionOpen, setIsQuestionOpen] = useState(false);
	const [question, setQuestion] = useState<BasicQuestion>({
		category: "Attente",
		questionText: "En cours de chargement...",
	});
	const lastQuestionIndex = useRef<number | null>(null);

	const openQuestion = async () => {
		setIsQuestionOpen(true); // Immediately open the modal with the loading message
		const response = await fetch("/api/questions");
		const questions = await response.json(); // Assume this returns an array of questions

		let randomIndex;
		if (questions.length > 1) {
			do {
				randomIndex = Math.floor(Math.random() * questions.length);
			} while (randomIndex === lastQuestionIndex.current);
		} else {
			randomIndex = 0;
		}

		lastQuestionIndex.current = randomIndex;
		setQuestion(questions[randomIndex]);
	};

	const closeQuestion = () => {
		setIsQuestionOpen(false);
	};

	return (
		<div>
			<button
				className="max-w-xs ml-auto block hover:opacity-80"
				onClick={openQuestion}
			>
				<Image
					src="/images/question-1969017_1280.png"
					width={30}
					height={50}
					alt="Questions Holistis"
					className="object-cover ml-auto w-5 md:w-6 h-auto"
					priority
				/>
			</button>

			{isQuestionOpen && (
				<QuestionModal
					question={question}
					open={isQuestionOpen}
					setOpen={closeQuestion}
				/>
			)}
		</div>
	);
}
