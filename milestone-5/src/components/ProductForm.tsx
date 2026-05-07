import React, { useState, useEffect } from 'react';
import { Product } from '../services/api';

interface ProductFormProps {
  initialData: Product | null;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
  products: Product[];
}

interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel, products }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    images: ['https://placeimg.com/640/480/any']
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price,
        description: initialData.description,
        images: initialData.images || ['https://placeimg.com/640/480/any']
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    const isDuplicate = products.some(p => 
      p.title.toLowerCase() === formData.title.toLowerCase() && p.id !== initialData?.id
    );
    if (isDuplicate) newErrors.title = 'Product name must be unique';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-scale-in">
        <div className="p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {initialData ? 'Update Product' : 'Add New Product'}
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">Manage your product details and inventory.</p>
            </div>
            <button onClick={onCancel} className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
              <i className="ph-bold ph-x text-2xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] px-1">Product Title</label>
                <input 
                  type="text"
                  className={`input-field ${errors.title ? 'border-rose-300 bg-rose-50/20' : ''}`}
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Premium Wireless Headphones"
                />
                {errors.title && <p className="text-rose-500 text-[11px] font-bold px-1">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] px-1">Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number"
                    className={`input-field pl-8 ${errors.price ? 'border-rose-300 bg-rose-50/20' : ''}`}
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="text-rose-500 text-[11px] font-bold px-1">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] px-1">Stock Category</label>
                <div className="relative">
                  <select className="input-field appearance-none">
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Furniture</option>
                  </select>
                  <i className="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] px-1">Description</label>
                <textarea 
                  className={`input-field min-h-[120px] resize-none ${errors.description ? 'border-rose-300 bg-rose-50/20' : ''}`}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter a detailed description of the product..."
                />
                {errors.description && <p className="text-rose-500 text-[11px] font-bold px-1">{errors.description}</p>}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="button" 
                onClick={onCancel}
                className="flex-1 px-8 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all border border-slate-100"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-[2] btn-primary py-3.5 justify-center text-base"
              >
                {initialData ? 'Update Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
