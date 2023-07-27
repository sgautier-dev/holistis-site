"use client";
import { useState } from "react";
import Image from "next/image";
import QuestionModal from "./QuestionModal";
import { getRandomQuestion } from "@/sanity/lib/getRandomQuestion";

export default function QuestionButton() {
	const [isQuestionOpen, setIsQuestionOpen] = useState(false);
	const [question, setQuestion] = useState<BasicQuestion>({
		category: "Attente",
		questionText: "En cours de chargement...",
	});

	const openQuestion = async () => {
		setIsQuestionOpen(true); // Immediately open the modal with the loading message
		const newQuestion = await getRandomQuestion();
		setQuestion(newQuestion); // Then update the question once the fetch is done
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
					className="object-cover ml-auto w-6 md:w-7 h-auto"
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
