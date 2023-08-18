import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
const mailchimp = require("@mailchimp/mailchimp_marketing");
import { toHTML } from "@portabletext/to-html";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER,
});

const secret = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
	const signature = req.headers.get(SIGNATURE_HEADER_NAME);
	const body = await req.text(); // Read the body into a string
	const siteUrl = process.env.SITE_URL;

	if (!siteUrl) {
		return NextResponse.json(
			{
				message: "Missing WEBSITE URL in env variables!",
			},
			{ status: 500 } // or appropriate status code
		);
	}

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

	const { bannerImage, title, mainImage, editoText, slug } = JSON.parse(body);
	const formattedTitle = `${bannerImage?.alt}, ${title}`;

	const campaignData = {
		banner_image: bannerImage?.asset?.url,
		title: title,
		main_image: mainImage?.asset?.url,
		edito_text: toHTML(editoText),
		link: `${siteUrl}/overview/${slug.current}`,
		formatted_title: formattedTitle,
	};

	console.log(campaignData);

	const campaignHtml = `
    <div style="text-align:center; margin: 0 auto; max-width: 672px; color: #000066; line-height: 28px;">
        <img src="${campaignData.banner_image}" alt="Banner Image" style="width: 100%; max-width: 800px;">
        <h1 style="font-family: 'Verdana', sans-serif; margin-top: 2em; font-size: 24px; text-transform: uppercase; color: #FF6600;">${campaignData.title}</h1>
        <figure style="margin-top: 2em;">
        <img src="${campaignData.main_image}" alt="Main Image" style="width: 100%; max-width: 600px; border: 4px solid #FF6600; border-radius: 12px">
        </figure>
        <div style="margin-top: 2em; font-family: 'Helvetica', sans-serif; font-size: 16px;text-align:left;">
        ${campaignData.edito_text}
        </div>
        <div style="margin-top: 2em;">
        <a href="${campaignData.link}" style="color: #FF6600; font-family: 'Helvetica', sans-serif;">Pour découvrir ${campaignData.formatted_title}</a>
        </div>
    </div>`;

	try {
		const response = await mailchimp.campaigns.create({
			type: "regular",
			recipients: {
				list_id: process.env.MAILCHIMP_AUDIENCE_ID,
			},
			settings: {
				subject_line: campaignData.formatted_title,
				preview_text: "Aperçu de votre campagne",
				title: "Brouillon pour " + campaignData.title,
				from_name: "Holistis",
				reply_to: process.env.SMTP_USER,
				content_type: "template",
			},
		});

		await mailchimp.campaigns.setContent(response.id, {
			html: campaignHtml,
		});

		return NextResponse.json(
			{
				message: "Campaign draft created successfully in MailChimp!",
				campaign_id: response.id,
			},
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof Error) {
			logger.error("Failed to create MailChimp campaign draft.", error);
			return NextResponse.json(
				{
					message: "Failed to create MailChimp campaign draft.",
					error: error.message,
				},
				{ status: 500 }
			);
		}
		throw error;
	}
}
