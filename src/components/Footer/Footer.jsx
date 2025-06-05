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
            <li><a href="/">Главная</a></li>
            <li><a href="/catalog">Каталог</a></li>
            <li><a href="/account">Аккаунт</a></li>
            <li><a href="/cart">Корзина</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Контакты</h4>
          <p>Email: info@stylehub.com</p>
          <p>Телефон: +1 (234) 567-8900</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BLAENZAIGA. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;