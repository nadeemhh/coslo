"use client";

import '../../component/component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../useAuthCheck.js';

const Usersidebar = () => {
  const [currentPath, setCurrentPath] = useState('');

  useAuthCheck();

  useEffect(() => {
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
    window.location.href = '/auth/superadminlogin';
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/admin/Employees', icon: 'fas fa-users', label: 'Employees' },
    { path: '/admin/manufacturerssuppliers', icon: 'fas fa-industry', label: 'Manufacturers/Suppliers' },
    { path: '/admin/Buyers', icon: 'fas fa-user', label: 'Buyers' },
    { path: '/admin/PlatformDeliverables', icon: 'fas fa-truck', label: 'Platform Deliverables' },
    { path: '/admin/CreateAdmin', icon: 'fas fa-user-plus', label: 'Create Admin' },
    { path: '/admin/feedback', icon: 'fas fa-comment', label: 'Feedback' },
  ];

  return (
    <div className="side-bar sidebar" id="sidebar">
  
<img src="\icons\Coslo Super Admin.svg" alt="" style={{marginBottom:'20px',width:'180px'}}/>
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

<p style={{textAlign:'left',marginTop:'40px',marginBottom:'15px',fontSize:'18px'}}>Misc</p>
<a href="/admin/PlatformCustomisation">

<div className="menu-item" style={{backgroundColor:'#E8FFF3',color:'#179757',border:'1px solid #179757'}}><i className="fas fa-headset">
  </i><span>Platform Customisation</span>
</div>
  </a>
      </div>
    </div>
  );
};

export default Usersidebar;
