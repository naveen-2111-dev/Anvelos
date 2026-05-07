import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProductById } from '../store/productsSlice';
import { cartActions } from '../store/cartSlice';
import { Minus, Plus, Star, Check } from 'lucide-react';
import type { CartItem } from '../types';

interface RouteParams {
  id: string;
}

interface ColorOption {
  name: string;
  hex: string;
}

const COLORS: ColorOption[] = [
  { name: 'olive', hex: '#4F4631' },
  { name: 'navy',  hex: '#314446' },
  { name: 'black', hex: '#313446' },
];

const SIZES = ['Small', 'Medium', 'Large', 'X-Large'] as const;
type Size = (typeof SIZES)[number];

const sanitize = (raw: string): string => raw.replace(/[\[\]"]/g, '');

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading, error } = useAppSelector((s) => s.products);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<Size>('Large');

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  const handleAddToCart = (): void => {
    if (!product) return;
    const imageUrl = product.images.length > 0 ? sanitize(product.images[0]) : '';
    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: imageUrl,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(cartActions.addItem(item));
  };

  if (loading) return <div className="container section">Loading product details…</div>;
  if (error)   return <div className="container section">Error: {error}</div>;
  if (!product) return null;

  const imageUrl = product.images.length > 0
    ? sanitize(product.images[0])
    : 'https://placehold.co/600x600?text=No+Image';

  return (
    <div className="product-details-page">
      <div className="container breadcrumbs">
        <Link to="/">Home</Link> / <span>Shop</span>
      </div>

      <div className="container product-main">
        <div className="product-gallery">
          <div className="thumbnails desktop-thumbs">
            {product.images.slice(0, 3).map((img, i) => (
              <div key={i} className={`thumb ${i === 0 ? 'active' : ''}`}>
                <img src={sanitize(img)} alt="" onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = imageUrl; }} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={imageUrl} alt={product.title} />
          </div>
        </div>

        <div className="product-info-details">
          <h1>{product.title}</h1>
          <div className="product-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill={i < 4 ? '#FFC633' : 'none'} color="#FFC633" />
              ))}
            </div>
            <span>4.5/5</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${Math.round(product.price * 1.2)}</span>
            <span className="discount-badge">-20%</span>
          </div>

          <p className="description">{product.description}</p>
          <hr />

          {/* Color Selection */}
          <div className="selection-group">
            <p className="group-label">Select Colors</p>
            <div className="color-options">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  className={`color-btn ${selectedColor === c.name ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={c.name}
                >
                  {selectedColor === c.name && <Check size={16} color="white" />}
                </button>
              ))}
            </div>
          </div>
          <hr />

          {/* Size Selection */}
          <div className="selection-group">
            <p className="group-label">Choose Size</p>
            <div className="size-options">
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <hr />

          <div className="add-to-cart-controls">
            <div className="quantity-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={20} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase"><Plus size={20} /></button>
            </div>
            <button className="btn btn-primary add-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      <style>{`
        .breadcrumbs { padding: 24px 0; color: var(--gray-text); font-size: 0.9rem; }
        .breadcrumbs span { color: var(--primary-black); }
        .product-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-bottom: 80px; }
        .product-gallery { display: flex; gap: 16px; }
        .desktop-thumbs { display: flex; flex-direction: column; gap: 16px; }
        .thumb { width: 150px; height: 160px; background: var(--off-white); border-radius: 20px; overflow: hidden; cursor: pointer; border: 2px solid transparent; }
        .thumb.active { border-color: var(--primary-black); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .main-image { flex: 1; background: var(--off-white); border-radius: 20px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .main-image img { width: 100%; height: auto; max-height: 550px; object-fit: cover; }
        .product-info-details h1 { font-size: 2.5rem; margin-bottom: 12px; }
        .product-info-details .product-rating { margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .product-info-details .stars { color: #FFC633; display: flex; }
        .product-info-details .product-price { font-size: 2rem; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-weight: 700; }
        .description { color: var(--gray-text); margin-bottom: 24px; line-height: 1.6; }
        hr { border: none; border-top: 1px solid var(--border-color); margin: 24px 0; }
        .selection-group { margin-bottom: 24px; }
        .group-label { color: var(--gray-text); margin-bottom: 16px; }
        .color-options { display: flex; gap: 12px; }
        .color-btn { width: 37px; height: 37px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
        .color-btn.active { box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--primary-black); }
        .size-options { display: flex; gap: 12px; flex-wrap: wrap; }
        .size-btn { padding: 12px 24px; border-radius: 62px; background-color: var(--off-white); color: var(--gray-text); font-weight: 500; transition: var(--transition); }
        .size-btn.active { background-color: var(--primary-black); color: var(--white); }
        .add-to-cart-controls { display: flex; gap: 20px; }
        .quantity-selector { background-color: var(--off-white); border-radius: 62px; padding: 12px 20px; display: flex; align-items: center; gap: 24px; }
        .quantity-selector span { font-weight: 600; min-width: 20px; text-align: center; }
        .add-btn { flex: 1; }
        .current-price { }
        .old-price { color: rgba(0,0,0,0.4); text-decoration: line-through; font-size: 1.4rem; }
        .discount-badge { background-color: rgba(255,51,51,0.1); color: var(--accent-red); font-size: 0.85rem; padding: 4px 12px; border-radius: 62px; }
        @media (max-width: 992px) {
          .product-main { grid-template-columns: 1fr; }
          .product-gallery { flex-direction: column-reverse; }
          .desktop-thumbs { flex-direction: row; overflow-x: auto; }
          .thumb { width: 100px; height: 100px; flex-shrink: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;
