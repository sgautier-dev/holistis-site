"use client";
import { useState, FormEvent, useEffect } from "react";
import Script from "next/script";
import useRecaptcha from "@/lib/hooks/useRecaptcha";
import { BellAlertIcon } from "@heroicons/react/24/outline";
export default function NewsletterForm() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	//hidding Google reCaptcha badge from page
	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
		  .grecaptcha-badge {
			visibility: hidden !important;
		  }
		`;
		document.head.appendChild(style);
	}, []);

	const validateEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	const { getRecaptchaToken } = useRecaptcha("newsletter_form");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMessage("");

		const token = await getRecaptchaToken();
		// console.log("token", token);
		if (!token) {
			setMessage(
				"Erreur lors de la vérification de sécurité. Veuillez réessayer."
			);
			setMessage("Envoyer");
			setIsSubmitting(false);
			return;
		}

		if (!validateEmail(email)) {
			setMessage("Veuillez entrer une adresse e-mail valide.");
			return;
		}

		setIsSubmitting(true);

		try {
			// console.log('email dans NewsletterForm: ', email)
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, token }),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage(data.message);
				setEmail("");
			} else {
				setMessage(
					data.message || "Une erreur est survenue. Veuillez réessayer."
				);
			}
		} catch (error) {
			console.error(error);
			setMessage("Une erreur est survenue. Veuillez réessayer.");
		}

		setIsSubmitting(false);
	};

	return (
		<div className="mt-10 xl:mt-0" id="newsletter">
			<div className="flex items-center gap-4">
				<BellAlertIcon
					className="h-6 w-6 text-orange animate-pulse"
					aria-label="newsletter"
				/>
				<h2 className="text-sm font-bold tracking-tight text-orange sm:text-base">
					S&apos;abonner à Overview, la newsletter
				</h2>
			</div>
			<p className="mt-4 text-sm leading-8 text-gray-300">
				Avec cette newsletter, j’ai envie de vous partager ce qui nourrit ma
				réflexion et mes accompagnements pour contribuer à la transformation
				individuelle puis collective.
			</p>
			<form onSubmit={handleSubmit}>
				<div className="mt-6 flex max-w-md gap-x-4">
					<label htmlFor="email-address" className="sr-only">
						Adresse e-mail
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="Saisissez votre e-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="flex-none rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
					>
						{isSubmitting ? "Envoi en cours..." : "Envoyer"}
					</button>
				</div>
				{message && (
					<p className="mt-4 text-right text-sm text-orange">{message}</p>
				)}
			</form>
			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
			/>
		</div>
	);
}
