"use client";

import '../../component/component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../useAuthCheck.js';

const Usersidebar = () => {
  const [currentPath, setCurrentPath] = useState('');
  useAuthCheck('/auth/Employeelogin');
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      // Redirect to the login page
      window.location.href = '/auth/Employeelogin';
    }


    console.log(window.location.pathname)
    // Set the current path when the component mounts
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    window.location.href = '/auth/Employeelogin';
  };


  const menuItems = [
    { path: '/Employee/Onboarding', icon: 'fas fa-user-plus', label: 'Seller Onboarding' },
    { path: '/Employee/Sellers', icon: 'fas fa-users', label: 'Sellers' },

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
 <div className='menu-item' onClick={handleLogout}>
              <i className='fas fa-sign-out-alt' style={{color:'red'}}></i>
              <span>Log Out</span>
            </div>


      </div>
    </div>
  );
};

export default Usersidebar;
