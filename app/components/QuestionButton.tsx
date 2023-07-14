"use client";
import { useState } from "react";
import Image from "next/image";
import QuestionModal from "./QuestionModal";

export default function QuestionButton() {
	const [isQuestionOpen, setQuestionOpen] = useState(false);

	return (
		<div>
			<a
				href="#"
				className="max-w-xs ml-auto"
				onClick={(e) => {
					e.preventDefault();
					setQuestionOpen(true);
				}}
			>
				<Image
					src="/images/question-1969017_1280.png"
					width={50}
					height={100}
					alt="Questions Holistis"
					className="object-cover ml-auto"
					priority
				/>
			</a>

			{isQuestionOpen && (
				<QuestionModal open={isQuestionOpen} setOpen={setQuestionOpen} />
			)}
		</div>
	);
}
