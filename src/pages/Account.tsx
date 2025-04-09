
import React, { useState } from 'react';
import { User, Settings, Package, Coffee, LogOut, Lock } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [isAdmin] = useState(true); // Simplified - would normally use authentication
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-coffee-dark text-white p-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <p className="text-coffee-cream">Manage your profile and settings</p>
      </div>

      {/* Profile Summary */}
      <div className="bg-white p-4 flex items-center border-b">
        <div className="w-16 h-16 bg-coffee-cream rounded-full flex items-center justify-center">
          <User size={32} className="text-coffee-dark" />
        </div>
        <div className="ml-4">
          <h2 className="font-bold text-lg">Shop Owner</h2>
          <p className="text-sm text-gray-500">owner@unicafe.com</p>
        </div>
      </div>

      {/* Account Options */}
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-coffee-dark">Account</h3>

        <div className="space-y-2">
          <button 
            onClick={() => navigate('/account/profile')} 
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <User size={18} className="text-coffee-dark mr-3" />
              <span>Profile Information</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/account/security')} 
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <Lock size={18} className="text-coffee-dark mr-3" />
              <span>Security</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/account/settings')} 
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <Settings size={18} className="text-coffee-dark mr-3" />
              <span>Settings</span>
            </div>
          </button>
        </div>

        {/* Admin Section - Only visible to admin users */}
        {isAdmin && (
          <>
            <h3 className="font-semibold text-coffee-dark mt-6">Store Management</h3>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/admin/products')} 
                className="w-full flex items-center justify-between p-3 bg-coffee-cream rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Coffee size={18} className="text-coffee-dark mr-3" />
                  <span>Manage Products</span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/admin/orders')} 
                className="w-full flex items-center justify-between p-3 bg-coffee-cream rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Package size={18} className="text-coffee-dark mr-3" />
                  <span>Orders</span>
                </div>
              </button>
            </div>
          </>
        )}

        {/* Logout */}
        <button className="w-full mt-8 flex items-center justify-center p-3 border border-red-500 text-red-500 rounded-lg">
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Account;
