import HomeCards from "./components/HomeCards";
import Quote from "./components/Quote";

export default async function Home() {
	const response = await fetch(`${process.env.SITE_URL}/api/quotes`);
	const quotes = await response.json();

	const randomIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[randomIndex];

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			{/* <h1 className="mb-12 text-5xl text-center text-orange font-bariol">
				En cours de développement 🙏🏼
			</h1> */}
			<HomeCards />
			<Quote quote={quote} />
			{/* <NewsletterForm /> */}
		</main>
	);
}
