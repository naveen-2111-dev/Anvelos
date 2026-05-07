import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const addProduct = (data) => api.post('/products', {
  ...data,
  categoryId: 1, // Default category for simplicity
  images: ["https://placeimg.com/640/480/any"] // Default image
});
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
