import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export type CreateProductDTO = Omit<Product, 'id' | 'category'> & { categoryId: number };
export type UpdateProductDTO = Partial<CreateProductDTO>;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);
export const addProduct = (data: Partial<Product>) => api.post<Product>('/products', {
  ...data,
  categoryId: 1,
  images: data.images || ["https://placeimg.com/640/480/any"]
});
export const updateProduct = (id: number, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete<boolean>(`/products/${id}`);

export default api;
