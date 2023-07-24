import Link from "next/link";

export const metadata = {
	title: "Mentions légales",
};

export default function Legal() {
	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<article className="container mx-auto text-white">
				<h1 className="text-3xl font-bold mb-4 text-orange">Mentions légales</h1>
				<p className="mb-4">
					Holistis respecte et se conforme à toutes les obligations légales
					requises pour la mise en ligne d&apos;un site internet. Sur cette
					page, vous trouverez toutes les informations légales concernant notre
					entreprise et l&apos;utilisation de notre site web.
				</p>
				<p className="mb-4">
					Le numéro SIRET de l&apos;entreprise Holistis est 530 472 372 00024.
				</p>
				<p className="mb-4">
					Le représentant légal d&apos;Holistis est Boris Benet.
				</p>
				<p className="mb-4">
					Le site web d&apos;Holistis est hébergé par Vercel Inc., dont le siège
					social est situé 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
				</p>
				<p className="mb-4">
					Les images utilisées sur ce site web sont fournies par Unsplash. Selon
					la licence Unsplash, ces images peuvent être utilisées gratuitement à
					des fins commerciales et non commerciales sans avoir à donner crédit.
				</p>
			</article>
		</main>
	);
}
