import "./globals.css";
import Navbar from "./components/Navbar";
import localFont from "next/font/local";

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
	title: "Holistis website",
	description: "la plateforme web d'Holistis",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" className={`${gotham.variable} ${bariol.variable}`}>
			<body className=" bg-purple font-gotham">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
