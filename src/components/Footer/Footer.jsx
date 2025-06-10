import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">BLAENZAIGA</h3>
          <p className="footer-text">Лучший магазин модной одежды для современных людей</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Ссылки</h4>
          <ul className="footer-links">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/account">Аккаунт</Link></li>
            <li><Link to="/cart">Корзина</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Контакты</h4>
          <ul className="footer-contacts">
            <li>
              <a href="mailto:info@blaenzaiga.com">
                <span className="contact-icon">✉</span> info@blaenzaiga.com
              </a>
            </li>
            <li>
              <a href="tel:+12345678900">
                <span className="contact-icon">📞</span> +1 (234) 567-8900
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BLAENZAIGA. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;