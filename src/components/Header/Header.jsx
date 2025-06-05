import { Link } from 'react-router-dom';
import './Header.scss';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
      <Link to="/" className="logo-link">
          <h1 className="logo">BLAENZAIGA</h1>
        </Link>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/account">Аккаунт</Link></li>
            <li><Link to="/add-product" className="add-product-link">Добавить товар</Link></li>
            <li>
              <Link to="/cart" className="cart-link">
                <FiShoppingCart className="cart-icon" />
                <span className="cart-count">0</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;