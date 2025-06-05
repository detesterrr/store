import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">STYLEHUB</h3>
          <p className="footer-text">The best fashion store for modern people</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/account">Account</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Us</h4>
          <p>Email: info@stylehub.com</p>
          <p>Phone: +1 (234) 567-8900</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} STYLEHUB. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;