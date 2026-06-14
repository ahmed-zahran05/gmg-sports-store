export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  availability: string;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  variants: ProductVariant[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  brand?: string;
  sku?: string;
  tags?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}
