const envVarsToValidate = [
	"NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
	"RECAPTCHA_SECRET_KEY",
	"MAILCHIMP_API_KEY",
	"MAILCHIMP_SERVER",
	"MAILCHIMP_AUDIENCE_ID",
	"SMTP_HOST",
	"SMTP_PORT",
	"SMTP_USER",
	"SMTP_PASS",
	"SITE_URL",
	"NEXT_PUBLIC_SANITY_PROJECT_ID",
	"NEXT_PUBLIC_SANITY_DATASET",
	"WEBHOOK_SECRET",
	"REVALIDATE_TOKEN",
	// ... any other variables to validate.
];

envVarsToValidate.forEach((variable) => {
	if (!process.env[variable]) {
		throw new Error(`Environment variable ${variable} is missing.`);
	}
});
