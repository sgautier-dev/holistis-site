"use client";
import { useState } from "react";
import Image from "next/image";
import QuestionModal from "./QuestionModal";
import { getRandomQuestion } from "@/sanity/lib/getRandomQuestion";

export default function QuestionButton() {
	const [isLoading, setIsLoading] = useState(false);
	const [isQuestionOpen, setIsQuestionOpen] = useState(false);
	const [question, setQuestion] = useState<BasicQuestion>({
		questionText: "En cours de chargement...",
	});

    //to prevent multiple fetches from re-rendering
	const openQuestion = async () => {
		setIsLoading(true);
		const newQuestion = await getRandomQuestion();
		setQuestion(newQuestion);
		setIsLoading(false);
		setIsQuestionOpen(true);
	};

	const closeQuestion = () => {
		setIsQuestionOpen(false);
	};

	return (
		<div className="absolute right-3 sm:right-24 md:right-32 lg:right-60 xl:right-80">
			<button
				className="max-w-xs ml-auto block"
				onClick={openQuestion}
				disabled={isLoading}
			>
				<Image
					src="/images/question-1969017_1280.png"
					width={30}
					height={50}
					alt="Questions Holistis"
					className="object-cover ml-auto"
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
