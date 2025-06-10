import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useCart();
  const { addOrder } = useOrders();
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const order = {
      items: cartItems.map(item => ({ 
        ...item,
        size: item.size || 'Не указан'
      })),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString()
    };
    
    try {
      const newOrder = addOrder(order);
      setOrderNumber(newOrder.id);
      clearCart();
      setIsCheckoutSuccess(true);
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  const handleQuantityChange = (id, size, newQuantity) => {
    updateQuantity(id, size, newQuantity);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <Link to="/catalog" className="continue-shopping">
            Продолжить покупки
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size || 'no-size'}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Размер: {item.size || 'Не указан'}</p>
                  <p>Цена: {item.price} ₽</p>
                </div>
                <div className="quantity-control">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  Итого: {item.price * item.quantity} ₽
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total">
              <span>Общая сумма:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}  

{isCheckoutSuccess && (
        <div className="checkout-success-overlay">
          <div className="checkout-success-modal">
            <h3>Заказ успешно оформлен!</h3>
            <p>Номер вашего заказа: #{orderNumber}</p>
            <p>Вы можете просмотреть его в <Link to="/account">истории заказов</Link></p>
            <Link 
              to="/catalog" 
              className="continue-button"
              onClick={() => setIsCheckoutSuccess(false)}
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;