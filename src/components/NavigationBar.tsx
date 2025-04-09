
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User, Search } from 'lucide-react';

const NavigationBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 z-50">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/shop" className={`bottom-nav-item ${isActive('/shop') ? 'active' : ''}`}>
        <Coffee size={24} />
        <span className="text-xs mt-1">Shop</span>
      </Link>
      <Link to="/search" className={`bottom-nav-item ${isActive('/search') ? 'active' : ''}`}>
        <Search size={24} />
        <span className="text-xs mt-1">Search</span>
      </Link>
      <Link to="/cart" className={`bottom-nav-item ${isActive('/cart') ? 'active' : ''}`}>
        <ShoppingCart size={24} />
        <span className="text-xs mt-1">Cart</span>
      </Link>
      <Link to="/account" className={`bottom-nav-item ${isActive('/account') || isActive('/admin') ? 'active' : ''}`}>
        <User size={24} />
        <span className="text-xs mt-1">Account</span>
      </Link>
    </div>
  );
};

export default NavigationBar;
