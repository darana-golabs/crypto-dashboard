import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CryptoStore {
  order: string[];
  setOrder: (order: string[]) => void;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      order: [],
      setOrder: (order) => set({ order }),
    }),
    {
      name: "crypto-order",
    }
  )
);
