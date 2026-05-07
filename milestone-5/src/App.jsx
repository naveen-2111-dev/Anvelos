import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import DeleteModal from './components/DeleteModal';
import { getProducts, addProduct, updateProduct, deleteProduct } from './services/api';
import './index.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingProduct) {
        const response = await updateProduct(editingProduct.id, formData);
        setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
      } else {
        const response = await addProduct(formData);
        setProducts([response.data, ...products]);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct(deletingProduct.id);
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white ml-0 border-l border-border">
        <header className="px-8 py-6 border-b border-border bg-white z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your inventory and track stock levels.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              <i className="ph ph-download"></i>
              <span>Export</span>
            </button>
            <button 
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }} 
              className="btn-primary"
            >
              <i className="ph-bold ph-plus text-sm"></i>
              <span>Add Product</span>
            </button>
          </div>
        </header>

        <div className="px-8 py-4 bg-white border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-sm font-medium text-slate-700 shadow-sm">
              <i className="ph ph-funnel"></i>
              <span>Filters</span>
            </button>
          </div>
          <div className="relative">
            <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm w-72 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <section className="flex-1 p-8 overflow-y-auto scrollbar-hide bg-[#F9FAFB]">
          <ProductTable 
            products={filteredProducts} 
            isLoading={isLoading} 
            onEdit={(p) => {
              setEditingProduct(p);
              setIsFormOpen(true);
            }}
            onDelete={(p) => setDeletingProduct(p)}
          />
        </section>
      </main>

      {isFormOpen && (
        <ProductForm 
          initialData={editingProduct}
          products={products}
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {deletingProduct && (
        <DeleteModal 
          product={deletingProduct}
          onConfirm={handleDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};

export default App;
