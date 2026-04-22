import { router } from "expo-router";
import { TypeNews } from "../types/NewsType";

export const goToInfoNews = (data: TypeNews) => {
    router.push({
        pathname: '/webview/[id]',
        params: {
            id: data.id,
            url: data.url,
            title: data.title,
            newsData: JSON.stringify(data)
        }
    });
};