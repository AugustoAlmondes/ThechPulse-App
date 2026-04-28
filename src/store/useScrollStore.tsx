import { create } from "zustand";

type ScrollState = {
    shouldScrollToTop: boolean,
    triggerScrollToTop: () => void,
    resetScroll: () => void
}

export const useScrollStore = create<ScrollState>((set) => ({
    shouldScrollToTop: false,
    triggerScrollToTop: () => set({ shouldScrollToTop: true }),
    resetScroll: () => set({ shouldScrollToTop: false })
}))