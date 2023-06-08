import { getArticle } from "@/sanity/lib/getArticle";
import { notFound } from 'next/navigation';

type Props = {
    params: {article: string}
}

export async function generateMetadata({ params }: Props) {
    const slug = params.article;
    const article = await getArticle(slug);
    
    return {
        title: article?.title
    }
}

export default async function Article({ params }: Props) {
	const slug = params.article;
	const article = await getArticle(slug);

    if (!article) {
        notFound()
    }

	return <div>{article?.title}</div>;
}
