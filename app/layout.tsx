import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
	title: "Holistis website",
	description: "la plateforme web d'Holistis",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body className="dark:bg-slate-800">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
