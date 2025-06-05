import { Link } from 'react-router-dom';
import './Header.scss';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">BLAENZAIGA</Link>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/catalog" className="nav-link">Каталог</Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link">Аккаунт</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link cart-link">
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