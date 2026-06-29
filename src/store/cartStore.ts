import { create } from 'zustand';
import { CartItem } from '../types/cart';

interface CartStore {
  items: CartItem[];
  appliedCoupon: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getTotalMRP: () => number;
  getDiscount: () => number;
  getFinalTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  appliedCoupon: null,

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: item.quantity || 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    });
  },

  applyCoupon: (code) => set({ appliedCoupon: code }),

  removeCoupon: () => set({ appliedCoupon: null }),

  clearCart: () => set({ items: [], appliedCoupon: null }),

  getTotalMRP: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getDiscount: () => {
    const coupon = get().appliedCoupon;
    if (coupon === 'B1G1' || coupon === 'PILGRIM-B1G1') return 645;
    return 0;
  },

  getFinalTotal: () => get().getTotalMRP() - get().getDiscount(),

  getItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
