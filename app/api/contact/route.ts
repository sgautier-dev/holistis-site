import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
const nodemailer = require("nodemailer");
import { validateEmail } from "@/lib/utils";

// Create a transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true, // true set Port, false for other ports
	auth: {
		user: process.env.SMTP_USER, // SMTP username
		pass: process.env.SMTP_PASS, // SMTP password
	},
});

function sendEmail(
	firstName: string,
	lastName: string,
	email: string,
	message: string
) {
	return transporter.sendMail({
		from: `${firstName} ${lastName} <${email}>`,
		to: process.env.SMTP_USER,
		subject: "Nouveau message du site Holistis",
		text: message,
	});
}

export async function POST(req: NextRequest) {
	const { firstName, lastName, email, message, token } = await req.json();

	// console.log('SMTP_PASS', process.env.SMTP_PASS)

	const verifyRecaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

	// console.log('data: ',`${firstName} ${lastName} ${email} ${message}`)

	if (!email || !firstName || !lastName || !message)
		return NextResponse.json(
			{ message: "Tous les champs du formulaire sont requis !" },
			{ status: 400 }
		);
	if (!validateEmail(email)) {
		return NextResponse.json({ message: "Email invalide" }, { status: 400 });
	}

	try {
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
		await sendEmail(firstName, lastName, email, message);

		return NextResponse.json(
			{
				message: "E-mail envoyé avec succès !",
			},
			{ status: 200 }
		);
	} catch (error: any) {
		logger.error(error);
		const { title, detail, status } = error.response?.body || {};
		return NextResponse.json(
			{
				title: title,
				detail: detail,
				message: "Échec de l'envoi de l'e-mail.",
			},
			{ status: status || 500 }
		);
	}
}
