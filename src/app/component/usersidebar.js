"use client";

import './component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import handleLogout from './handleuserLogout.js'

const Usersidebar = () => {
  const pathname = usePathname();

  const [user, setuser] = useState(null);

  // const [currentPath, setCurrentPath] = useState('');
console.log(pathname)
  // useEffect(() => {
  //   console.log(window.location.pathname)
  //   // Set the current path when the component mounts
  //   if (typeof window !== 'undefined') {
  //     setCurrentPath(window.location.pathname);
  //   }
  // }, []);

 

  const menuItems = [
    { path: '/user/orders', icon: 'fas fa-box', label: 'My Orders' },
    { path: '/user/myaccount', icon: 'fas fa-user', label: 'My Account' },
    // { path: '/user/notification', icon: 'fas fa-bell', label: 'Notifications' },
    { path: '/user/wishlist', icon: 'fas fa-heart', label: 'Wishlist' },
    { path: '/user/feedback', icon: 'fas fa-comment', label: 'Feedback' },
  ];


  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('buyer')))
  }, []);

  return (
    <div className="side-bar sidebar" id="sidebar usersidebar">
    {user &&  <div className="profile">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          {/* <h3>{user.name}</h3> */}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>}



      {/* Menu Items */}
      <div className="menu">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.path}>
            <div
              className={`menu-item ${pathname === item.path ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Usersidebar;

