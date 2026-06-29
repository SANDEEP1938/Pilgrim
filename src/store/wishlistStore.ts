import { create } from 'zustand';

interface WishlistStore {
  items: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  toggleWishlist: (id) => {
    const current = get().items;
    if (current.includes(id)) {
      set({ items: current.filter((i) => i !== id) });
    } else {
      set({ items: [...current, id] });
    }
  },

  isWishlisted: (id) => get().items.includes(id),
}));
