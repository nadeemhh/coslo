"use client";

import '../../component/component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../useAuthCheck.js';

const Usersidebar = () => {
  const [currentPath, setCurrentPath] = useState('');
  useAuthCheck('/auth/sup-manu/login');

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
    window.location.href = '/auth/sup-manu/login';
  };

  const menuItems = [
    { path: '/supplier/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/supplier/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/supplier/Set-Profit-Margin', icon: 'fas fa-percent', label: 'Set Profit Margin' },
    { path: '/supplier/Products', icon: 'fas fa-box', label: 'Products' },
    { path: '/supplier/Quotations', icon: 'fas fa-envelope', label: 'Quotations' },
    { path: '/supplier/subscription', icon: 'fas fa-rupee-sign', label: 'Subscription' }
  ];

  return (
    <div className="side-bar sidebar" id="sidebar">
  
<img src="\icons\Coslo Supplier Admin.svg" alt="" style={{marginBottom:'20px',width:'180px'}}/>
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

<p style={{textAlign:'left',marginTop:'40px',marginBottom:'15px',fontSize:'18px'}}>Support</p>
<a href="/supplier/CustomerSupport">

<div className="menu-item" style={{backgroundColor:'#E8FFF3',color:'#179757',border:'1px solid #179757'}}><i className="fas fa-headset">
  </i><span>Customer Support</span>
</div>
  </a>
      </div>
    </div>
  );
};

export default Usersidebar;




// import '../../component/component-css/usersidebar.css';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';  // Import usePathname from next/navigation

// const Usersidebar = () => {
//   const pathname = usePathname();  // Get the current pathname from next/navigation

//   const menuItems = [
//     { path: '/supplier/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
//     { path: '/supplier/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
//     { path: '/supplier/Products', icon: 'fas fa-box', label: 'Products' },
//     { path: '/supplier/Enquiries', icon: 'fas fa-envelope', label: 'Enquiries' },
//     { path: '/supplier/subscription', icon: 'fas fa-rupee-sign', label: 'Subscription' }
//   ];

//   return (
//     <div className="side-bar sidebar" id="sidebar">
//       <img src="\icons\Coslo Supplier Admin.svg" alt="" style={{marginBottom:'20px'}}/>
//       {/* Menu Items */}
//       <div className="menu">
//         {menuItems.map((item) => (
//           <Link key={item.path} href={item.path}>
//             <div
//               className={`menu-item ${pathname === item.path ? 'active' : ''}`}  // Add 'active' class conditionally
//             >
//               <i className={item.icon}></i>
//               <span>{item.label}</span>
//             </div>
//           </Link>
//         ))}
        
//         <p style={{textAlign:'left', marginTop:'40px', marginBottom:'15px', fontSize:'18px'}}>Support</p>
//         <Link href="/supplier/CustomerSupport">
//           <div
//             className="menu-item"
//             style={{backgroundColor:'#E8FFF3', color:'#179757', border:'1px solid #179757'}}
//           >
//             <i className="fas fa-headset"></i>
//             <span>Customer Support</span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };