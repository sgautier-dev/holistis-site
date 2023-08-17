import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
const mailchimp = require("@mailchimp/mailchimp_marketing");
import { toHTML } from "@portabletext/to-html";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { Readable } from "stream";

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER,
});

const secret = process.env.WEBHOOK_SECRET;

async function readBody(readable: Readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks).toString("utf8");
}

export async function POST(req: NextRequest) {
	const signature = req.headers.get(SIGNATURE_HEADER_NAME);
	const body = await req.text(); // Read the body into a string

	if (!secret) {
		return NextResponse.json(
			{
				message: "Missing Webhook Secret in env variables!",
			},
			{ status: 500 } // or appropriate status code
		);
	}

	if (!signature) {
		return NextResponse.json(
			{
				message: "Missing Webhook Signature!",
			},
			{ status: 400 }
		);
	}

	if (!isValidSignature(body, signature, secret)) {
		return NextResponse.json(
			{
				message: "Invalid Webhook Signature!",
			},
			{ status: 401 }
		);
	}

	const { bannerImage, title, mainImage, editoText } = JSON.parse(body);

	const campaignData = {
		banner_image: bannerImage,
		title: title,
		main_image: mainImage,
		edito_text: toHTML(editoText),
	};

	console.log(campaignData);
}
