import { NextRequest, NextResponse } from "next/server";
const mailchimp = require("@mailchimp/mailchimp_marketing");
import logger from "@/lib/logger";
import { validateEmail, getRecaptchaVerificationUrl } from "@/lib/utils";

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER,
});

/*
Subscribe form route: It validates an email address, verifies a reCAPTCHA token, and adds the email address to a Mailchimp mailing list if all validations pass.
*/
export async function POST(req: NextRequest) {
	const { email, token } = await req.json();

	if (!email)
		return NextResponse.json({ message: "E-mail absent!" }, { status: 400 });
	if (!validateEmail(email)) {
		return NextResponse.json({ message: "Email invalide" }, { status: 400 });
	}

	try {
		const verifyRecaptchaUrl = getRecaptchaVerificationUrl(token);
		const verifyRecaptcha = await fetch(verifyRecaptchaUrl);
		const responseRecaptcha = await verifyRecaptcha.json();

		if (!responseRecaptcha.success) {
			return NextResponse.json(
				{
					message: "La vérification reCAPTCHA a échoué !",
				},
				{ status: 400 }
			);
		}
	} catch (error: any) {
		logger.error(error);
		return NextResponse.json(
			{
				message: "Une erreur est survenue lors de la vérification reCAPTCHA.",
			},
			{ status: 500 }
		);
	}

	try {
		const listId = process.env.MAILCHIMP_AUDIENCE_ID;
		const response = await mailchimp.lists.addListMember(listId, {
			email_address: email,
			status: "subscribed",
		});

		if (response.status === "subscribed") {
			// console.log('response status: ', response.status)
			return NextResponse.json(
				{
					message: "Abonnement confirmé ! Merci de vous être abonné.",
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					message: "Une erreur est survenue. Veuillez réessayer.",
				},
				{ status: 400 }
			);
		}
	} catch (error: any) {
		logger.error(error);
		const { title, detail, status } = error.response?.body || {};
		switch (title) {
			case "Invalid Resource":
				return NextResponse.json(
					{ message: "Veuillez entrer une adresse e-mail valide." },
					{ status: error.status }
				);
			case "Member Exists":
				return NextResponse.json(
					{ message: "Vous êtes déjà abonné à la newsletter !" },
					{ status: error.status }
				);
			case "Forgotten Email Not Subscribed":
				return NextResponse.json(
					{
						message:
							"Cette adresse e-mail a été supprimée définitivement de la liste. Veuillez utiliser une autre adresse e-mail pour vous réinscrire.",
					},
					{ status: error.status }
				);
			// add other error cases here
			default:
				return NextResponse.json(
					{
						message: detail || "Une erreur inattendue est survenue.",
					},
					{ status: status || 500 }
				);
		}
	}
}
