import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const STYLE_CATEGORIES = [
  { name: 'Casual', className: 'casual', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=500&auto=format&fit=crop' },
  { name: 'Formal', className: 'formal', image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f6f1?q=80&w=500&auto=format&fit=crop' },
  { name: 'Party',  className: 'party',  image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop' },
  { name: 'Gym',    className: 'gym',    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop' },
] as const;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const newArrivals: Product[] = products.slice(0, 4);
  const topSelling: Product[] = products.slice(5, 9);

  const renderGrid = (items: Product[]) => (
    <div className="grid-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            <button className="btn btn-primary shop-now-btn">Shop Now</button>
            <div className="stats">
              {[
                { value: '200+', label: 'International Brands' },
                { value: '2,000+', label: 'High-Quality Products' },
                { value: '30,000+', label: 'Happy Customers' },
              ].map(({ value, label }) => (
                <div className="stat-item" key={label}>
                  <h3>{value}</h3>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" alt="Hero fashion" />
          </div>
        </div>
      </section>

      {/* Brands */}
      <div className="brands-bar">
        <div className="container">
          {['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'CALVIN KLEIN'].map((b) => (
            <span className="brand-logo" key={b}>{b}</span>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <section id="new-arrivals">
        <div className="container">
          <h2 className="section-title">NEW ARRIVALS</h2>
          {loading ? (
            <p className="loading">Loading products…</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : (
            <>
              {renderGrid(newArrivals)}
              <div className="view-all-container">
                <button className="btn btn-outline">View All</button>
              </div>
            </>
          )}
        </div>
      </section>

      <hr className="container" />

      {/* Top Selling */}
      <section id="top-selling">
        <div className="container">
          <h2 className="section-title">TOP SELLING</h2>
          {!loading && (
            <>
              {renderGrid(topSelling)}
              <div className="view-all-container">
                <button className="btn btn-outline">View All</button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Style Grid */}
      <section className="style-grid-section">
        <div className="container style-container">
          <h2 className="section-title">BROWSE BY DRESS STYLE</h2>
          <div className="style-grid">
            {STYLE_CATEGORIES.map(({ name, className, image }) => (
              <div
                key={name}
                className={`style-item ${className}`}
                style={{ backgroundImage: `url('${image}')` }}
              >
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hero { background-color: var(--off-white); padding-top: 80px; padding-bottom: 0; }
        .hero-content { display: flex; align-items: center; gap: 60px; }
        .hero-text { flex: 1; }
        .hero-text h1 { font-size: 4rem; line-height: 1; margin-bottom: 32px; }
        .hero-text p { color: var(--gray-text); margin-bottom: 48px; max-width: 550px; }
        .shop-now-btn { padding: 16px 54px; font-size: 1rem; margin-bottom: 48px; }
        .stats { display: flex; gap: 32px; }
        .stat-item h3 { font-size: 2.5rem; margin-bottom: 8px; }
        .stat-item p { font-size: 0.9rem; margin: 0; }
        .hero-image { flex: 1; height: 600px; border-radius: 20px 20px 0 0; overflow: hidden; }
        .hero-image img { width: 100%; height: 100%; object-fit: cover; }
        .brands-bar { background-color: var(--primary-black); padding: 40px 0; }
        .brands-bar .container { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        .brand-logo { color: var(--white); font-size: 2rem; font-weight: 800; opacity: 0.8; }
        .view-all-container { text-align: center; margin-top: 40px; }
        .view-all-container .btn { padding: 16px 80px; }
        .style-grid-section { margin-bottom: 100px; }
        .style-container { background-color: var(--off-white); border-radius: 40px; padding: 80px 64px; }
        .style-grid { display: grid; grid-template-columns: 1fr 1.5fr; grid-template-rows: repeat(2, 280px); gap: 20px; }
        .style-item { background-color: var(--white); border-radius: 20px; padding: 24px; background-size: cover; background-position: center; transition: var(--transition); overflow: hidden; }
        .style-item:hover { transform: scale(1.02); }
        .style-item h3 { font-size: 2rem; text-transform: capitalize; }
        .casual { grid-column: 1; grid-row: 1; }
        .formal { grid-column: 2; grid-row: 1; }
        .party  { grid-column: 2; grid-row: 2; }
        .gym    { grid-column: 1; grid-row: 2; }
        @media (max-width: 992px) {
          .hero-text h1 { font-size: 2.5rem; }
          .hero-image { display: none; }
          .style-grid { grid-template-columns: 1fr; grid-template-rows: repeat(4, 200px); }
          .style-item { grid-column: 1 !important; grid-row: auto !important; }
          .brands-bar .container { justify-content: center; }
        }
        @media (max-width: 768px) {
          .stats { flex-wrap: wrap; justify-content: center; }
          .hero-text { text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
