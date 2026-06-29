export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  size?: string;
}

export interface Coupon {
  code: string;
  description: string;
  discount: number;
}
