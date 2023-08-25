export const validateEmail = (email: string) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};
export function getRecaptchaVerificationUrl(token: string): string {
	const params = new URLSearchParams();
	params.append("secret", process.env.RECAPTCHA_SECRET_KEY!);
	params.append("response", token);

	return `https://www.google.com/recaptcha/api/siteverify?${params.toString()}`;
}
