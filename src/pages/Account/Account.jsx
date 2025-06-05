import './Account.scss';
import { useState } from 'react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      total: 89.98,
      status: 'Delivered',
      items: [
        { name: 'Basic White T-Shirt', quantity: 1, price: 29.99 },
        { name: 'Black Denim Jeans', quantity: 1, price: 59.99 }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2023-06-01',
      total: 29.99,
      status: 'Shipped',
      items: [
        { name: 'Basic White T-Shirt', quantity: 1, price: 29.99 }
      ]
    }
  ]);

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>My Account</h1>
        
        <div className="account-tabs">
          <button 
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Account Details
          </button>
        </div>
        
        <div className="account-content">
          {activeTab === 'orders' ? (
            <div className="orders-section">
              <h2>Order History</h2>
              
              {orders.length === 0 ? (
                <p className="no-orders">You haven't placed any orders yet.</p>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <span className="order-id">Order #{order.id}</span>
                          <span className="order-date">Placed on {order.date}</span>
                        </div>
                        <div className="order-total">
                          <span>Total: ${order.total.toFixed(2)}</span>
                          <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="view-order">View Order Details</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="details-section">
              <h2>Account Details</h2>
              
              <form className="account-form">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    defaultValue="John" 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    defaultValue="Doe" 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    defaultValue="john.doe@example.com" 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    defaultValue="+1 (234) 567-8900" 
                  />
                </div>
                
                <button type="submit" className="save-changes">Save Changes</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;