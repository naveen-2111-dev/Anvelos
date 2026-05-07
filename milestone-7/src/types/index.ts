export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  cart: CartState;
  products: ProductsState;
}

export interface ProductRouteParams {
  id: string;
}
