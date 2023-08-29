import "./globals.css";
import "../lib/validateEnv";
import Header from "./components/Header";
import localFont from "next/font/local";
import Footer from "./components/Footer";

const gotham = localFont({
	src: [
		{
			path: "./fonts/gothamlight-webfont.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/gothamlightitalic-webfont.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "./fonts/gothambook-webfont.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/gothambookitalic-webfont.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/gothammedium-webfont.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/gothammediumitalic-webfont.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "./fonts/gothambold-webfont.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/gothambolditalic-webfont.woff2",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-gotham",
	display: "swap",
});

const bariol = localFont({
	src: [
		{
			path: "./fonts/bariol_regular-webfont.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/bariol_regular_italic-webfont.woff2",
			weight: "400",
			style: "italic",
		},
	],
	variable: "--font-bariol",
	display: "swap",
});

export const metadata = {
	title: "Holistis, l’essence de la transformation",
	description:
		"Ici vous découvrirez mes sources d’inspiration pour vous accompagnez individuellement ou collectivement. Elles invitent à des changements de perspective. Je vous souhaite qu’elles vous offrent des perspectives de changement.",
	authors: [{ name: "Sébastien Gautier", url: "https://www.sgautier.dev" }],
};

// export const revalidate = 60; //to get freshest data from sanity, replaced by on demand revalidation

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="fr"
			className={`${gotham.variable} ${bariol.variable} sm:scroll-smooth`}
		>
			<body className=" bg-purple font-bariol">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
