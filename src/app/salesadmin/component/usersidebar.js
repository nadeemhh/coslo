"use client";

import '../../component/component-css/usersidebar.css';
import '../../component/component-css/adminpanelayout.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../useAuthCheck.js';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);

  useAuthCheck('/auth/saleslogin','salestoken');
  
  useEffect(() => {

    const baseMenuItems = [
        { path: '/salesadmin/leads', icon: 'fas fa-users', label: 'Leads' }
    ];


    setMenuItems(baseMenuItems);
  }, []);

  if (!menuItems) {
    return null; // or return a loading spinner
  }

  return (
    <div>
      <Usersidebar menuItems={menuItems} />
      {/* Rest of the dashboard layout */}
    </div>
  );
};


const Usersidebar = ({menuItems}) => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
     
    localStorage.removeItem('salestoken');
    window.location.href = '/auth/saleslogin';
  };

  return (
    <div className="side-bar sidebar" id="sidebar" style={{height:'100%'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}><img src="\images\coslologo.png" alt="" style={{width:'50px'}}/>
      <label>Coslomart Seo Admin</label></div>
      
      {/* Menu Items */}
      <div className="menu">
        {menuItems.map((item) => (
          <a href={item.path} key={item.path}>
            <div className={`menu-item ${currentPath === item.path ? 'active' : ''}`}>
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          </a>
        ))}

        {/* Log Out */}
        <div className="menu-item" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" style={{ color: 'red' }}></i>
          <span>Log Out</span>
        </div>

    
      </div>
    </div>
  );
};

export default AdminDashboard;

