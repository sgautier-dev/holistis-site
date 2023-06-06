import Link from "next/link";

export const metadata = {
	title: 'Confidentialité',
}

export default function Privacy() {
	return (
		<article className="container mx-auto px-4 py-8 text-white min-h-screen">
			<h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
			<p className="mb-4">
				Nous attachons une grande importance à la protection de vos données
				personnelles. Cette politique de confidentialité décrit les informations
				que nous collectons et comment nous les utilisons.
			</p>
			<h2 className="text-xl font-bold mb-2">
				Collecte de données personnelles
			</h2>
			<p className="mb-4">
				Nous ne collectons que les informations nécessaires à l&apos;envoi de
				notre newsletter, à savoir votre nom et votre adresse e-mail. Nous ne
				collectons aucune autre information, telle que votre adresse IP ou vos
				informations de localisation.
			</p>
			<h2 className="text-xl font-bold mb-2">
				Utilisation des données personnelles
			</h2>
			<p className="mb-4">
				Nous utilisons vos données personnelles uniquement pour vous envoyer
				notre newsletter et pour personnaliser son contenu à l&apos;avenir.
			</p>
			<h2 className="text-xl font-bold mb-2">
				Partage de données personnelles
			</h2>
			<p className="mb-4">
				Nous ne partageons pas vos données personnelles avec des tiers, tels que
				des partenaires ou des prestataires de services.
			</p>
			<h2 className="text-xl font-bold mb-2">
				Sécurité des données personnelles
			</h2>
			<p className="mb-4">
				Les données personnelles collectées vont directement vers MailChimp, qui
				assure la sécurité et la protection des données selon leurs propres
				politiques.
			</p>
			<h2 className="text-xl font-bold mb-2">
				Vos droits en matière de données personnelles
			</h2>
			<p className="mb-4">
				Vous pouvez à tout moment vous désabonner de notre liste de diffusion en
				cliquant sur le lien de désabonnement fourni dans nos e-mails. Si vous
				avez des questions ou des préoccupations concernant vos données
				personnelles, vous pouvez nous contacter via le{" "}
				<Link href="/contact" className="text-orange hover:text-gray-700">
					formulaire de contact
				</Link>{" "}
				disponible sur notre site web.
			</p>
			<p className="mb-4">
				Ce site est protégé par reCAPTCHA{" "}
				<Link
					href="https://policies.google.com/privacy"
					target="_blank"
					className="text-orange hover:text-gray-700"
				>
					les règles de confidentialité
				</Link>{" "}
				et{" "}
				<Link
					href="https://policies.google.com/terms"
					target="_blank"
					className="text-orange hover:text-gray-700"
				>
					les conditions d&apos;utilisation
				</Link>{" "}
				de Google s&apos;appliquent.
			</p>
		</article>
	);
}
