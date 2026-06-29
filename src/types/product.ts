export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  badge?: string;
  tag?: string;
  category?: string;
  description?: string;
  howToUse?: string;
  sizes?: ProductSize[];
}

export interface ProductSize {
  label: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  productId?: string;
}

export interface CelebPick {
  id: string;
  name: string;
  image: string;
  featured?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface DealCard {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}
