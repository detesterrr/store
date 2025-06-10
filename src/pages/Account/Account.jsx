import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import './Account.scss';

const Account = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      phone: '+7 (123) 456-78-90',
      address: 'ул. Примерная, д. 10, кв. 25',
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const { orders, removeOrder } = useOrders();

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      removeOrder(orderId);
    }
  };

  return (
    <div className="account-page mobile-account">
      <div className="account-header mobile-header">
        <h1>Мой аккаунт</h1>
        {!isEditing && (
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Редактировать
          </button>
        )}
      </div>

      <div className="account-content mobile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Адрес</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">
                Сохранить
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <div className="account-info">
            <div className="info-item">
              <span className="label">Имя:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Телефон:</span>
              <span className="value">{user.phone}</span>
            </div>
            <div className="info-item">
              <span className="label">Адрес:</span>
              <span className="value">{user.address}</span>
            </div>
          </div>
        )}
      </div>

      <div className="account-orders mobile-orders">
        <h2>Мои заказы</h2>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <span className="order-id">Заказ #{order.id}</span>
                  <span className="order-date">{order.date}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <button 
                    className="delete-order-button"
                    onClick={() => handleDeleteOrder(order.id)}
                    title="Удалить заказ"
                  >
                    ×
                  </button>
                </div>
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={`${order.id}-${item.id}`} className="order-product">
                      <img src={item.image} alt={item.name} />
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        <p>{item.quantity} × {item.price.toLocaleString()} ₽</p>
                        {item.size && <p>Размер: {item.size}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    Итого: {order.total.toLocaleString()} ₽
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">
              <p>У вас пока нет заказов</p>
              <a href="/catalog" className="browse-products">
                Перейти в каталог
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;