import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Stocks
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/Stock">Stocks</a>
      </li>
      <li>
        <a href="/History">Stock History</a>
      </li>
      <li>
        <a href="/leaderboard">Leaderboard</a>
      </li>
      <li>
        <a href="/PlaceOrder">Place Order</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <a href="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">0</span>
    </a>
    <a href="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </a>
  </div>
</nav>
);
};

export default Navbar;