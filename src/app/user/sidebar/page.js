"use client";

import '../../component/component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './page.css'
import handleLogout from './../../component/handleuserLogout.js'

export default function Page() {
 const [currentPath, setCurrentPath] = useState('');
 const [user, setuser] = useState(null);

  useEffect(() => {
    console.log(window.location.pathname)
    // Set the current path when the component mounts
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    setuser(JSON.parse(localStorage.getItem('buyer')))

  }, []);

 

  const menuItems = [
    { path: '/user/orders', icon: 'fas fa-box', label: 'My Orders' },
    { path: '/user/myaccount', icon: 'fas fa-user', label: 'My Account' },
    // { path: '/user/notification', icon: 'fas fa-bell', label: 'Notifications' },
    { path: '/user/wishlist', icon: 'fas fa-heart', label: 'Wishlist' },
    { path: '/user/feedback', icon: 'fas fa-comment', label: 'Feedback' },
  ];

  return (
    <div id="sidebar" >


     {user &&  <div className="profile">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h3>{user.name}</h3>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
}



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
}


