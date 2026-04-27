import { router } from "expo-router";
import { TypeNews } from "../types/NewsType";
import { useHistoricStore } from "../store/historicStore";

export const goToInfoNews = (data: TypeNews) => {
    // Adiciona a notícia ao histórico antes de navegar
    useHistoricStore.getState().addHistoricNews(data);

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