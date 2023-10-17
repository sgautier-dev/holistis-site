"use client"
import React, { useEffect, useState, useRef } from "react"
import HomeCards from "./components/HomeCards"
import Quote from "./components/Quote"

const defaultQuote: BasicQuote = {
	quoteText:
		"On ne change jamais les choses en combattant la réalité existante. Pour changer quelque chose, construisez un nouveau modèle qui rendra inutile l’ancien.",
	quoteAuthor: "Richard Buckminster Fuller",
}

export default function Home() {
	const [quote, setQuote] = useState<BasicQuote>(defaultQuote)

	useEffect(() => {
		const fetchData = async () => {
			let quotes = JSON.parse(sessionStorage.getItem("quotes") || "[]")

			if (!quotes.length) {
				const response = await fetch("/api/quotes")
				quotes = await response.json()
				sessionStorage.setItem("quotes", JSON.stringify(quotes))
			}

			if (quotes && quotes.length > 0) {
				const randomIndex = Math.floor(Math.random() * quotes.length)
				setQuote(quotes[randomIndex])
			}
		}

		fetchData()
	}, [])

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<figure id="targetElement" className="border-l border-orange pl-8 mb-12">
				<blockquote className="sm:text-lg font-semibold text-white">
					<p>
						Ici vous découvrirez mes sources d’inspiration pour vous accompagner
						individuellement ou collectivement. Elles invitent à des changements
						de perspective. Je vous souhaite qu’elles vous offrent des
						perspectives de changement.
					</p>
				</blockquote>
			</figure>
			<HomeCards />
			<Quote quote={quote} />
			{/* <NewsletterForm /> */}
		</main>
	)
}
