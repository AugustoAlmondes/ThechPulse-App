import { useEffect, useRef, useCallback } from 'react';

/**
 * Ad Unit ID para o anúncio Intersticial.
 * Troque pelo seu Ad Unit ID real quando for publicar:
 * Ex: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'
 */
const AD_UNIT_ID = __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // ID de teste oficial do Google
    : 'ca-app-pub-3940256099942544/1033173712'; // Substitua pelo seu real ao publicar

/**
 * Tenta carregar o módulo nativo do AdMob de forma segura.
 * Retorna null quando rodando no Expo Go (sem suporte a módulos nativos).
 */
function tryLoadAdsModule() {
    try {
        // Importação lazy para não quebrar o Expo Go
        const ads = require('react-native-google-mobile-ads');
        // Valida que o módulo nativo está disponível de fato
        if (!ads?.InterstitialAd || !ads?.AdEventType) return null;
        return ads;
    } catch {
        return null;
    }
}

const AdsModule = tryLoadAdsModule();

/**
 * Hook para gerenciar anúncios intersticiais do AdMob.
 *
 * - Em builds nativas: carrega e exibe o anúncio automaticamente.
 * - No Expo Go: é um no-op silencioso (não quebra a tela).
 * - Recarrega após o anúncio ser fechado.
 * - Expõe `showAd()` para exibir o anúncio quando estiver pronto.
 */
export function useInterstitialAd() {
    const isLoaded = useRef(false);

    // Cria a instância do anúncio apenas se o módulo nativo estiver disponível
    const interstitial = useRef(
        AdsModule
            ? AdsModule.InterstitialAd.createForAdRequest(AD_UNIT_ID, {
                  requestNonPersonalizedAdsOnly: false,
              })
            : null
    ).current;

    const loadAd = useCallback(() => {
        if (!interstitial) return;
        isLoaded.current = false;
        interstitial.load();
    }, [interstitial]);

    useEffect(() => {
        if (!interstitial || !AdsModule) return;

        // Ouve quando o anúncio termina de carregar
        const onLoaded = interstitial.addAdEventListener(
            AdsModule.AdEventType.LOADED,
            () => {
                isLoaded.current = true;
            }
        );

        // Recarrega automaticamente após fechar
        const onClosed = interstitial.addAdEventListener(
            AdsModule.AdEventType.CLOSED,
            () => {
                loadAd();
            }
        );

        // Inicia o carregamento
        loadAd();

        return () => {
            onLoaded();
            onClosed();
        };
    }, [interstitial, loadAd]);

    /**
     * Exibe o anúncio se estiver carregado e disponível.
     * Retorna `true` se o anúncio foi exibido, `false` caso contrário.
     */
    const showAd = useCallback((): boolean => {
        if (!interstitial || !isLoaded.current) return false;
        interstitial.show();
        return true;
    }, [interstitial]);

    return { showAd };
}
