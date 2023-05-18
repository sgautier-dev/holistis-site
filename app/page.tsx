import NewsletterForm from "./components/NewsletterForm";
import HomeCards from "./components/HomeCards";
import Quote from "./components/Quote";

export default function Home() {
	return (
		<main className="px-6 lg:px-8 mx-auto min-h-screen">
			{/* <h1 className="mb-12 text-5xl text-center text-orange font-bariol">
				En cours de développement 🙏🏼
			</h1> */}
			<HomeCards />
      {/* @ts-expect-error Async Server Component */}
			<Quote />
			{/* <NewsletterForm /> */}
		</main>
	);
}
