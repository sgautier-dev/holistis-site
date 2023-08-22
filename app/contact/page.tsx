"use client";
import { useState, useEffect, FormEvent } from "react";
import Script from "next/script";
import useRecaptcha from "@/lib/hooks/useRecaptcha";
import { validateEmail } from "@/lib/utils";
import { Switch } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Contact() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [agreed, setAgreed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<string>("Envoyer");
	const [submitError, setSubmitError] = useState<string>("");

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

	const resetForm = () => {
		setAgreed(false);
		setFirstName("");
		setLastName("");
		setEmail("");
		setMessage("");
		setSubmitError("");
	};

	const { getRecaptchaToken } = useRecaptcha("contact_form");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setSubmitError("");
		setIsSubmitting(true);
		setSubmitMessage("Envoi en cours...");

		const token = await getRecaptchaToken();
		// console.log('token', token)
		if (!token) {
			setSubmitError(
				"Erreur lors de la vérification de sécurité. Veuillez réessayer."
			);
			setSubmitMessage("Envoyer");
			setIsSubmitting(false);
			return;
		}

		if (!validateEmail(email)) {
			setSubmitError("Veuillez entrer une adresse e-mail valide.");
			return;
		}

		try {
			if (agreed) {
				// sending newsletter's subscription
				// console.log('email for newsletter: ', email)
				const response = await fetch("/api/subscribe", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, token }),
				});

				const data = await response.json();

				if (response.ok) {
					setSubmitMessage(data.message);
				} else {
					throw new Error(
						data.message || "Une erreur est survenue. Veuillez réessayer."
					);
				}
			}
			// sending email
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, firstName, lastName, message, token }),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitMessage(data.message);
				resetForm();
			} else {
				throw new Error(
					data.message || "Une erreur est survenue. Veuillez réessayer."
				);
			}

			// throw new Error('test erreur')
		} catch (error: any) {
			console.error(error);
			setSubmitError(error.message);
		} finally {
			setTimeout(() => {
				setSubmitMessage("Envoyer");
			}, 3000); // delay before resetting the submission message
			setIsSubmitting(false);
		}
	};

	return (
		<div className="px-6 lg:px-8 py-20 sm:py-24  min-h-screen">
			<div
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
				aria-hidden="true"
			>
				<div
					className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange to-purple opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Formulaire de contact
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-400">
					Je suis à votre écoute pour toute demande d’information.
				</p>
			</div>
			<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-semibold leading-6 text-white"
						>
							Prénom
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="first-name"
								id="first-name"
								placeholder="Saisissez votre prénom"
								autoComplete="given-name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm font-semibold leading-6 text-white"
						>
							Nom
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="last-name"
								id="last-name"
								placeholder="Saisissez votre nom"
								autoComplete="family-name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-white"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Saisissez votre e-mail"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6 text-white"
						>
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								name="message"
								id="message"
								rows={4}
								placeholder="Saisissez votre message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
						<div className="flex h-6 items-center">
							<Switch
								checked={agreed}
								onChange={setAgreed}
								className={classNames(
									agreed ? "bg-orange" : "bg-gray-200",
									"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
								)}
							>
								<span className="sr-only">Agree to policies</span>
								<span
									aria-hidden="true"
									className={classNames(
										agreed ? "translate-x-3.5" : "translate-x-0",
										"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
									)}
								/>
							</Switch>
						</div>
						<Switch.Label className="text-sm leading-6 text-gray-400">
							En sélectionnant cette option, je m&apos;abonne à la newsletter.
						</Switch.Label>
					</Switch.Group>
				</div>

				<div className="mt-5">
					<button
						type="submit"
						disabled={isSubmitting}
						className="block w-full rounded-md bg-orange px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
					>
						{submitMessage}
					</button>
				</div>
				{submitError && (
					<div className="mt-2 text-sm sm:text-base flex items-center text-orange">
						<ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
						<p className="ml-2">{submitError}</p>
					</div>
				)}
			</form>
			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
			/>
		</div>
	);
}
