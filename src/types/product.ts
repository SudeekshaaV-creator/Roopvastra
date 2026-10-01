export interface Product {
  id: string;
  name: string;
  category: 'Women' | 'Men' | 'Kids' | 'Accessories';
  subcategory: string;
  gender: 'Women' | 'Men' | 'Boys' | 'Girls' | 'Unisex';
  productType: string;
  price: number;
  originalPrice?: number;
  discount?: number; // in percentage e.g. 25
  images: string[];
  description: string;
  fabric: string;
  material: string;
  colour: string;
  sizes: string[];
  rating: number; // out of 5
  stock: number;
  occasion: string;
  isNew: boolean;
  isSale: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type SortOption = 
  | 'featured' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'newest'
  | 'discount';
