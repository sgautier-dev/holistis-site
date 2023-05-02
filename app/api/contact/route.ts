import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
const nodemailer = require("nodemailer");

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

export async function POST(req: NextRequest) {
	const { firstName, lastName, email, message, token } = await req.json();

	console.log('SMTP_PASS', process.env.SMTP_PASS)

	const verifyRecaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

	// console.log('data: ',`${firstName} ${lastName} ${email} ${message}`)

	if (!email || !firstName || !lastName || !message)
		return NextResponse.json(
			{ message: "Tous les champs du formulaire sont requis !" },
			{ status: 400 }
		);

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

		await transporter.sendMail({
			from: `${firstName} ${lastName} <${email}>`,
			to: "hello@holistis.net",
			subject: "Nouveau message du site Holitis",
			text: message,
		});

        return NextResponse.json(
            {
                message: "L'email a été envoyé avec succès !",
            },
            { status: 200 });

	} catch (error: any) {
		logger.error(error);
		const { title, detail, status } = error.response?.body || {};
		return NextResponse.json(
			{   title: title,
                detail: detail,
				message: "Échec de l'envoi de l'e-mail.",
			},
			{ status: status || 500 }
		);
	}
}
