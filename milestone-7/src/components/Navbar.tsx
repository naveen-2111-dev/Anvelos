import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = (): void => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-left">
          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="logo" onClick={closeMenu}>SHOP.CO</Link>
        </div>

        <ul className="nav-links-desktop">
          <li><Link to="/">Shop</Link></li>
          <li><a href="#on-sale">On Sale</a></li>
          <li><a href="#new-arrivals">New Arrivals</a></li>
          <li><a href="#brands">Brands</a></li>
        </ul>

        <div className="nav-right">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search for products..." />
          </div>
          <div className="nav-icons">
            <button className="icon-btn search-mobile" aria-label="Search">
              <Search size={22} />
            </button>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingCart size={22} />
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </Link>
            <button className="icon-btn" aria-label="Account">
              <User size={22} />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Shop</Link></li>
          <li><a href="#on-sale" onClick={closeMenu}>On Sale</a></li>
          <li><a href="#new-arrivals" onClick={closeMenu}>New Arrivals</a></li>
          <li><a href="#brands" onClick={closeMenu}>Brands</a></li>
        </ul>
        <div className="mobile-search">
          <Search size={18} color="#666" />
          <input type="text" placeholder="Search for products..." />
        </div>
      </div>

      <style>{`
        .navbar { background-color: var(--white); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 1000; }
        .nav-content { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 24px; }
        .nav-left { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .logo { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.05em; white-space: nowrap; }
        .hamburger-btn { display: none; color: var(--primary-black); padding: 4px; line-height: 0; transition: var(--transition); }
        .hamburger-btn:hover { color: var(--gray-text); }
        .nav-links-desktop { display: flex; gap: 24px; font-weight: 500; flex-shrink: 0; white-space: nowrap; }
        .nav-links-desktop li a { transition: var(--transition); }
        .nav-links-desktop li a:hover { color: var(--gray-text); }
        .nav-right { display: flex; align-items: center; gap: 16px; flex: 1; justify-content: flex-end; min-width: 0; }
        .search-bar { background-color: var(--off-white); border-radius: 62px; padding: 10px 16px; display: flex; align-items: center; gap: 10px; flex: 1; max-width: 480px; min-width: 0; }
        .search-bar input { background: none; border: none; outline: none; width: 100%; font-size: 0.875rem; font-family: inherit; }
        .search-icon { color: var(--gray-text); flex-shrink: 0; }
        .nav-icons { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .icon-btn { position: relative; color: var(--primary-black); line-height: 0; transition: var(--transition); }
        .icon-btn:hover { color: var(--gray-text); }
        .cart-badge { position: absolute; top: -7px; right: -7px; background-color: var(--accent-red); color: var(--white); font-size: 0.65rem; padding: 2px 5px; border-radius: 50%; font-weight: bold; line-height: 1.4; }
        .search-mobile { display: none; }
        .mobile-menu { display: none; flex-direction: column; background: var(--white); border-top: 1px solid var(--border-color); overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding 0.35s ease; padding: 0 20px; }
        .mobile-menu.open { max-height: 400px; padding: 16px 20px 20px; }
        .mobile-menu ul { display: flex; flex-direction: column; margin-bottom: 16px; }
        .mobile-menu ul li a { display: block; padding: 12px 0; border-bottom: 1px solid var(--border-color); font-weight: 500; font-size: 1rem; transition: var(--transition); }
        .mobile-menu ul li:last-child a { border-bottom: none; }
        .mobile-menu ul li a:hover { color: var(--gray-text); }
        .mobile-search { background-color: var(--off-white); border-radius: 62px; padding: 10px 16px; display: flex; align-items: center; gap: 10px; }
        .mobile-search input { background: none; border: none; outline: none; width: 100%; font-size: 0.875rem; font-family: inherit; }
        @media (max-width: 992px) {
          .nav-links-desktop { display: none; }
          .search-bar { display: none; }
          .hamburger-btn { display: block; }
          .search-mobile { display: block; }
          .mobile-menu { display: flex; }
        }
        @media (max-width: 480px) {
          .logo { font-size: 1.5rem; }
          .nav-content { height: 60px; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
