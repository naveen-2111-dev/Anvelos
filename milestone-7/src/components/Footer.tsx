import { Globe, Rss, Share2, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="newsletter-section">
          <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary white-bg">Subscribe to Newsletter</button>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-info">
            <h1 className="logo">SHOP.CO</h1>
            <p>We have clothes that suit your style and which you're proud to wear. From women to men.</p>
            <div className="social-icons">
              <a href="#" aria-label="Website"><Globe size={20} /></a>
              <a href="#" aria-label="RSS"><Rss size={20} /></a>
              <a href="#" aria-label="Share"><Share2 size={20} /></a>
              <a href="#" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>

          {[
            { heading: 'Company', links: ['About', 'Features', 'Works', 'Career'] },
            { heading: 'Help', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
            { heading: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
            { heading: 'Resources', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
          ].map(({ heading, links }) => (
            <div className="footer-column" key={heading}>
              <h3>{heading}</h3>
              <ul>
                {links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment-methods">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map((m) => (
              <span className="payment-badge" key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer { background-color: var(--off-white); padding-top: 140px; margin-top: 100px; position: relative; }
        .newsletter-section { background-color: var(--primary-black); color: var(--white); border-radius: 20px; padding: 36px 64px; display: flex; justify-content: space-between; align-items: center; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: calc(100% - 40px); max-width: var(--container-max-width); gap: 40px; }
        .newsletter-section h2 { font-size: 2.5rem; max-width: 550px; line-height: 1; }
        .newsletter-form { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 350px; }
        .newsletter-form input { padding: 12px 16px; border-radius: 62px; border: none; outline: none; }
        .white-bg { background-color: var(--white) !important; color: var(--primary-black) !important; }
        .footer-links-grid { display: grid; grid-template-columns: 2fr repeat(4, 1fr); gap: 40px; padding-bottom: 40px; border-bottom: 1px solid var(--border-color); }
        .footer-info p { color: var(--gray-text); margin: 20px 0; font-size: 0.9rem; }
        .social-icons { display: flex; gap: 12px; }
        .social-icons a { width: 32px; height: 32px; background: var(--white); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
        .social-icons a:hover { background: var(--primary-black); color: var(--white); }
        .footer-column h3 { font-size: 1rem; margin-bottom: 24px; text-transform: uppercase; }
        .footer-column ul li { margin-bottom: 12px; }
        .footer-column ul li a { color: var(--gray-text); font-size: 0.9rem; transition: var(--transition); }
        .footer-column ul li a:hover { color: var(--primary-black); }
        .footer-bottom { padding: 20px 0; display: flex; justify-content: space-between; align-items: center; color: var(--gray-text); font-size: 0.8rem; }
        .payment-methods { display: flex; gap: 12px; flex-wrap: wrap; }
        .payment-badge { background: var(--white); padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border-color); font-weight: bold; }
        @media (max-width: 992px) {
          .newsletter-section { flex-direction: column; text-align: center; padding: 24px; }
          .newsletter-section h2 { font-size: 1.8rem; }
          .footer-links-grid { grid-template-columns: 1fr 1fr; }
          .footer-info { grid-column: span 2; }
        }
        @media (max-width: 480px) {
          .footer-links-grid { grid-template-columns: 1fr; }
          .footer-info { grid-column: span 1; }
          .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
