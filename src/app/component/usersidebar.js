"use client";

import './component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Usersidebar = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    console.log(window.location.pathname)
    // Set the current path when the component mounts
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const menuItems = [
    { path: '/user/orders', icon: 'fas fa-box', label: 'My Orders' },
    { path: '/user/myaccount', icon: 'fas fa-user', label: 'My Account' },
    { path: '/user/notification', icon: 'fas fa-bell', label: 'Notifications' },
    { path: '/user/wishlist', icon: 'fas fa-heart', label: 'Wishlist' },
  ];

  return (
    <div className="side-bar sidebar" id="sidebar">
      <div className="profile">
        <img
          src="/images/user1.png"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h3>Faiz Iqbal</h3>
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu">
        {menuItems.map((item) => (
          <a href={item.path} key={item.path}>
            <div
              className={`menu-item ${currentPath === item.path ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Usersidebar;
