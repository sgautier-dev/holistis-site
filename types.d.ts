interface Window {
	grecaptcha: ReCaptchaInstance;
}

type Base = {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
};

interface Quote extends Base {
	_type: "quote";
	quoteText: string;
	quoteAuthor: string;
}

interface BasicQuote {
	quoteText: string;
	quoteAuthor: string;
}

type IconProps = {
	className?: string;
	size?: string | number;
	color?: string;
};
