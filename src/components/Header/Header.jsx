import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Header.scss';

const Header = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">BLAENZAIGA</h1>
        </Link>

        {/* Кнопка мобильного меню */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMenu}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
            </li>
            <li>
              <Link to="/account" onClick={() => setMenuOpen(false)}>Аккаунт</Link>
            </li>
            <li>
              <Link 
                to="/cart" 
                className="cart-link"
                onClick={() => setMenuOpen(false)}
              >
                <FiShoppingCart className="cart-icon" />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;