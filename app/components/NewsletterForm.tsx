"use client";
import { useState, FormEvent, useEffect } from "react";
import Script from "next/script";

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

	const getRecaptchaToken = async () => {
		try {
			const token = await window.grecaptcha.execute(
				process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
				{ action: "newsletter_form" }
			);
			return token;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMessage("");

		const token = await getRecaptchaToken();
		console.log("token", token);
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
			// console.log('data dans NewsletterForm: ', data)

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
		<div className="relative isolate overflow-hidden bg-blue py-16 sm:py-24 lg:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none grid place-content-center">
					<div className="max-w-xl lg:max-w-lg">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							S&apos;abonner à Overview, la newsletter
						</h2>
						<p className="mt-4 text-lg leading-8 text-gray-300">
							Avec cette newsletter, j’ai envie de vous partager ce qui nourrit
							ma réflexion et mes accompagnements pour contribuer à la
							transformation individuelle puis collective.
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
									className="flex-none rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
								>
									{isSubmitting ? "Envoie en cours..." : "Envoyer"}
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
				</div>
			</div>
			<div
				className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
				aria-hidden="true"
			>
				<div
					className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blue to-orange opacity-30"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
		</div>
	);
}
