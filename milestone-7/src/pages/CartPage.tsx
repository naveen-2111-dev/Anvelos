import { cartActions } from '../store/cartSlice';
import { Trash2, Minus, Plus, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import type { CartItem } from '../types';

interface PromoForm {
  promoCode: string;
}

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector((state) => state.cart);

  const { register, handleSubmit } = useForm<PromoForm>();

  const handleUpdateQuantity = (id: number, quantity: number): void => {
    dispatch(cartActions.updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: number): void => {
    dispatch(cartActions.removeItem(id));
  };

  const onPromoSubmit = (data: PromoForm): void => {
    console.log('Promo code submitted:', data.promoCode);
    // Promo logic would go here
  };

  const discount = totalAmount > 200 ? Math.round(totalAmount * 0.2) : 0;
  const deliveryFee = totalAmount > 0 ? 15 : 0;
  const finalTotal = totalAmount - discount + deliveryFee;

  return (
    <div className="cart-page">
      <div className="container breadcrumbs">
        <Link to="/">Home</Link> / <span>Cart</span>
      </div>

      <div className="container">
        <h1 className="section-title left-align">YOUR CART</h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn btn-primary">Go Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-list">
              {items.map((item: CartItem) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = 'https://placehold.co/120x120?text=No+Image';
                    }} />
                  </div>
                  <div className="item-info">
                    <div className="item-header">
                      <h3>{item.title}</h3>
                      <button className="remove-btn" onClick={() => handleRemove(item.id)} aria-label="Remove item">
                        <Trash2 size={20} color="#FF3333" />
                      </button>
                    </div>
                    <p className="item-meta">Size: <span>{item.size}</span></p>
                    <p className="item-meta">Color: <span>{item.color}</span></p>
                    <div className="item-footer">
                      <span className="item-price">${item.price}</span>
                      <div className="quantity-selector small">
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} aria-label="Decrease"><Minus size={16} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} aria-label="Increase"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span className="value">${totalAmount.toFixed(2)}</span></div>
              <div className="summary-row"><span>Discount (-20%)</span><span className="value accent">-${discount.toFixed(2)}</span></div>
              <div className="summary-row"><span>Delivery Fee</span><span className="value">${deliveryFee}</span></div>
              <hr />
              <div className="summary-row total"><span>Total</span><span className="value">${finalTotal.toFixed(2)}</span></div>

              {/* Promo Code — React Hook Form */}
              <form className="promo-code" onSubmit={handleSubmit(onPromoSubmit)}>
                <div className="promo-input">
                  <Tag size={20} color="#666" />
                  <input
                    type="text"
                    placeholder="Add promo code"
                    {...register('promoCode', { required: true, minLength: 3 })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Apply</button>
              </form>

              <button className="btn btn-primary checkout-btn">
                Go to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .left-align { text-align: left; margin-bottom: 24px; }
        .cart-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 80px; }
        .cart-items-list { border: 1px solid var(--border-color); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 24px; }
        .cart-item { display: flex; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid var(--border-color); }
        .cart-item:last-child { border-bottom: none; padding-bottom: 0; }
        .item-image { width: 124px; height: 124px; background: var(--off-white); border-radius: 12px; overflow: hidden; flex-shrink: 0; }
        .item-image img { width: 100%; height: 100%; object-fit: cover; }
        .item-info { flex: 1; display: flex; flex-direction: column; }
        .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
        .item-header h3 { font-size: 1.1rem; text-transform: none; }
        .item-meta { font-size: 0.9rem; color: var(--gray-text); margin-bottom: 4px; }
        .item-meta span { color: var(--primary-black); }
        .item-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; }
        .item-price { font-size: 1.5rem; font-weight: 700; }
        .quantity-selector { background-color: var(--off-white); border-radius: 62px; padding: 12px 20px; display: flex; align-items: center; gap: 24px; }
        .quantity-selector.small { padding: 8px 16px; gap: 16px; }
        .quantity-selector span { font-weight: 600; min-width: 20px; text-align: center; }
        .order-summary { border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; height: fit-content; }
        .order-summary h3 { font-size: 1.5rem; margin-bottom: 24px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 1.1rem; color: var(--gray-text); }
        .summary-row .value { color: var(--primary-black); font-weight: 600; }
        .summary-row .accent { color: var(--accent-red); }
        .summary-row.total { color: var(--primary-black); font-size: 1.4rem; margin-top: 20px; }
        hr { border: none; border-top: 1px solid var(--border-color); margin: 24px 0; }
        .promo-code { display: flex; gap: 12px; margin: 24px 0; }
        .promo-input { background: var(--off-white); border-radius: 62px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; flex: 1; }
        .promo-input input { background: none; border: none; outline: none; width: 100%; font-family: inherit; }
        .checkout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px; }
        .empty-cart { text-align: center; padding: 80px 0; }
        .empty-cart p { font-size: 1.2rem; margin-bottom: 24px; color: var(--gray-text); }
        @media (max-width: 992px) { .cart-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default CartPage;
