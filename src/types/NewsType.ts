export interface NewsType {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string,
    by: string
}

export interface Main {
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
    image: string;
    language: string;
    category: string[];
    source_category: unknown[];
    published: string;
}