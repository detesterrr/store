import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.scss';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Ваша корзина пуста</h1>
        <Link to="/catalog" className="continue-shopping">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Ваша корзина ({totalItems})</h1>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={`${item.id}-${item.size}`} className="cart-item">
            <img 
              src={item.image} 
              alt={item.name}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Размер: {item.size}</p>
              <p>Цена: {item.price.toFixed(2)} ₽</p>
              
              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="item-total">
              {(item.price * item.quantity).toFixed(2)} ₽
            </div>
            
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id, item.size)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h2>Итого: {totalPrice.toFixed(2)} ₽</h2>
        <button className="checkout-btn">Оформить заказ</button>
        <Link to="/catalog" className="continue-shopping">
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
};

export default CartPage;