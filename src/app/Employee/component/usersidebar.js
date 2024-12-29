"use client";

import '../../component/component-css/usersidebar.css';
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
    { path: '/Employee/Onboarding', icon: 'fas fa-user-plus', label: 'Seller Onboarding' },

  ];

  return (
    <div className="side-bar sidebar" id="sidebar">
  
<img src="\icons\Coslo Employee Admin.svg" alt="" style={{marginBottom:'20px',width:'180px'}}/>
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
