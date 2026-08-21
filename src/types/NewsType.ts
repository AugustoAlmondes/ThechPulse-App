export interface NewsType {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string,
    by: string
}

export interface NewsAPIResponse {
    status: string;
    news: TypeNews[];
    page: number;
}

export interface TypeNews {
    id: string;
    title: string;
    description: string;
    url: string;
    author: string;
    image: string | null;
    language: string;
    category: string[];
    source_category: unknown[];
    published: string;
}

export function hasValidImage(image: unknown): boolean {
    if (typeof image !== 'string') return false;
    const t = image.trim();
    if (t === '' || t.toLowerCase() === 'none' || t.toLowerCase() === 'null') return false;
    return t.startsWith('http://') || t.startsWith('https://');
}

export function normalizeImage(image: unknown): string | null {
    return hasValidImage(image) ? (image as string).trim() : null;
}