import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Platzi API gives images as an array, sometimes they are invalid or broken
  const imageUrl = product.images && product.images[0] ? 
    product.images[0].replace(/[\[\]"]/g, '') : 
    'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={product.title} onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
        }} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < 4.5 ? "currentColor" : "none"} />
            ))}
          </div>
          <span>4.5/5</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.price > 100 && (
            <>
              <span className="old-price">${Math.round(product.price * 1.2)}</span>
              <span className="discount-badge">-20%</span>
            </>
          )}
        </div>
      </div>

      <style>{`
        .product-card {
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          background-color: var(--off-white);
          border-radius: 20px;
          aspect-ratio: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-title {
          font-size: 1.1rem;
          margin-bottom: 8px;
          text-transform: none;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .stars {
          color: #FFC633;
          display: flex;
          gap: 2px;
        }
        .product-rating span {
          font-size: 0.9rem;
          color: var(--gray-text);
        }
        .product-price {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.4rem;
        }
        .old-price {
          color: rgba(0,0,0,0.4);
          text-decoration: line-through;
        }
        .discount-badge {
          background-color: rgba(255, 51, 51, 0.1);
          color: var(--accent-red);
          font-size: 0.8rem;
          padding: 4px 12px;
          border-radius: 62px;
        }
      `}</style>
    </Link>
  );
};

export default ProductCard;
