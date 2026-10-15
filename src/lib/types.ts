export interface Category {
  id: string;
  slug: string;
  name: string;
}
export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  size: string;
  stock: number;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category["name"];
  price: number;
  images: string[];
  alt: string;
  description: string;
  fabric: string;
  care: string;
  variants: ProductVariant[];
  sample: true;
}
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
export interface Collection {
  slug: string;
  title: string;
  description: string;
  productIds: string[];
}
