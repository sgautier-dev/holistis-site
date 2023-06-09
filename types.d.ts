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

interface Slug {
	_type: "slug";
	current: string;
}

interface Image {
	_type: "image";
	asset: {
		_ref: string;
		_type: "reference";
	};
	alt: string;
}

interface Annotation {
	_type: "link";
	href: string;
}

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

interface BlockContent {
	_type: "block" | "image";
	style?: string;
	list?: string;
	marks?: {
		decorators?: { title: string; value: string }[];
		annotations?: Annotation[];
	};
	children?: BlockContent[];
	alt?: string; // For 'image' type
	asset?: Image;
}

interface Category extends Base {
	_type: "category";
	title: string;
	description: string;
}

interface Resource extends Base {
	_type: "resource";
	title: string;
	slug: Slug;
	picto: Image;
	duration: string;
	body: BlockContent[];
	mediaType: 'web' | 'video' | 'image';
	media: string;
	alt: string;
	categories: Category[];
}


interface Question extends Base {
	_type: "question";
	questionText: string;
	slug: Slug;
	categories: Category[];
}

interface Overview extends Base {
	_type: "overview";
	bannerImage: Image;
	title: string;
	slug: Slug;
	mainImage: Image;
	editoText: BlockContent[]; // replace by any if needed
	proposition180: {
		pictoImage: Image;
		question: Question;
	};
	contents: Resource[];
	questions: {
		image: Image;
		questions: Question[];
	};
	categories: Category[];
	publishedAt: string;
}
