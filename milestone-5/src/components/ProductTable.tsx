import React from 'react';
import { Product } from '../services/api';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} className="h-20 w-full bg-white border border-slate-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="table-header w-[40%]">Product Details</th>
            <th className="table-header">Price</th>
            <th className="table-header">Category</th>
            <th className="table-header text-right pr-8">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-slate-50 flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-slate-900 truncate">{product.title}</p>
                    <p className="text-[12px] text-slate-500 line-clamp-1">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-[14px] font-medium text-slate-900">
                  ${product.price}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="badge bg-slate-100 text-slate-700">
                  {product.category?.name || 'Standard'}
                </span>
              </td>
              <td className="px-6 py-4 text-right pr-8">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(product)}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <i className="ph ph-pencil-simple text-lg"></i>
                  </button>
                  <button 
                    onClick={() => onDelete(product)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <i className="ph ph-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
