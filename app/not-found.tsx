import Link from "next/link";

export default function NotFound() {
	return (
		<div className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-orange">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
					Page introuvable
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-300">
					Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/"
						className="rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
					>
						Retour à l&apos;accueil
					</Link>
				</div>
			</div>
		</div>
	);
}
