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

interface MediaContent {
	webUrl?: string;
	videoUrl?: string;
	imageUrl?: string;
	docFile?: string;
	audioFile?: string;
	mediaUrl?: string;
}

interface PictoImage extends Base {
	_type: "pictoImage";
	image: Image;
	alt: string;
}

interface Resource extends Base {
	_type: "resource";
	title: string;
	slug: Slug;
	picto: PictoImage;
	duration: string;
	body: BlockContent[];
	mediaType: "web" | "video" | "image" | "doc" | "audio";
	media: MediaContent;
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
	editoText: BlockContent[];
	sections: Section[];
	questions: {
		image: Image;
		questions: Question[];
	};
	categories: Category[];
	publishedAt: string;
}

interface Section {
	proposition180: {
		pictoImage: Image;
		question: Question;
	};
	subsections: Subsection[];
}

interface Subsection {
	title: string;
	contents: Resource[];
}
