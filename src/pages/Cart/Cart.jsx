import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';


const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Basic White T-Shirt',
      price: 29.99,
      size: 'M',
      quantity: 0,
      image: 'https://optim.tildacdn.com/stor6538-3935-4562-a464-353865333438/-/format/webp/93988918.png.webp'
    },
    {
      id: 2,
      name: 'Black Denim Jeans',
      price: 59.99,
      size: '32',
      quantity: 0,
      image: 'https://via.placeholder.com/100x100?text=Jeans'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Твоя корзина</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Твоя корзина пуста</p>
            <Link to="/catalog" className="continue-shopping">Перейти в каталог</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-item"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Общая суммма</h2>
              
              <div className="summary-row">
                <span>Стоимость</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Доставка</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Всего</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <button className="checkout-button">Оформить заказ</button>
              
              <Link to="/catalog" className="continue-shopping">Продолжить покупки</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;