"use client";

import '../../component/component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../useAuthCheck.js';

const Usersidebar = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [menuItems, setmenuItems] = useState([]);
  const [iscosload, setiscosload] = useState(false);
  const [issuperadmin,setissuperadmin] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  useAuthCheck('/auth/sup-manu/login','token');

  useEffect(() => {

    const admindata = JSON.parse(localStorage.getItem('sellerdata'))?.role;
    const iscoslo = admindata === 'COSLO_SELLER';

if(iscoslo){

  setmenuItems([   { path: '/supplier/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/supplier/Set-Profit-Margin', icon: 'fas fa-percent', label: 'Set Profit Margin' },
    { path: '/supplier/orders', icon: 'fas fa-shopping-cart', label: 'Orders' }])

    setiscosload(iscoslo);

}else{

  setmenuItems([   { path: '/supplier/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: null, icon: 'fas fa-shopping-cart', label: 'Orders', childmenu:[
      { path: '/supplier/productorders', icon: 'fas fa-receipt', label: 'product orders' },
    { path: '/supplier/serviceorders', icon: 'fas fa-receipt', label: 'service orders' }
  ]},
    { path: '/supplier/Products', icon: 'fas fa-box', label: 'Products' },
    { path: '/supplier/verification', icon: 'fas fa-check-circle', label: 'Bank Verification' },
    { path: '/supplier/Quotations', icon: 'fas fa-envelope', label: 'Quotations' },
    { path: '/supplier/payments', icon: 'fas fa-coins', label: 'Payments' },
    { path: '/supplier/subscription', icon: 'fas fa-rupee-sign', label: 'Subscription' },
    { path: '/supplier/Return', icon: 'fas fa-reply', label: 'Return Requests' },
    { path: '/supplier/cancelorders', icon: 'fas fa-ban', label: 'Cancel Requests' }
  
  ]
  
  )

}

    console.log(window.location.pathname,iscoslo,admindata)
    // Set the current path when the component mounts
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    if(localStorage.getItem('issuperadmin')==='true'){
      setissuperadmin(true)
    }
  }, []);

  const handleLogout = () => {
    // Remove the token 
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('token');
    localStorage.removeItem('sellerdata')
    // Redirect to the login page
    window.location.href = '/auth/sup-manu/login';
  };



   const toggleExpandMenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  
  const isChildActive = (childmenu) => {
    return childmenu && childmenu.some(child => child.path === currentPath);
  };


  const renderMenuItem = (item, isChild = false) => {
    // Handle parent menu items with no direct path (have children)
    if (item.path === null && item.childmenu) {
      const isExpanded = expandedMenus[item.label];
      const hasActiveChild = isChildActive(item.childmenu);
      
      return (
        <div key={item.label}>
          {/* Parent menu item that toggles child visibility */}
          <div
            className={`menu-item ${hasActiveChild ? 'active' : ''}`}
            onClick={() => toggleExpandMenu(item.label)}
            style={{ cursor: 'pointer' }}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
            {/* Arrow indicator for expandable menus */}
            <i 
              className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}
              style={{ marginLeft: 'auto', fontSize: '12px' }}
            ></i>
          </div>
          
          {/* Child menu items (shown when parent is expanded) */}
          {isExpanded && (
            <div style={{ marginLeft: '20px' }}>
              {item.childmenu.map((childItem) => renderMenuItem(childItem, true))}
            </div>
          )}
        </div>
      );
    }
    
    // Handle regular menu items with direct paths
    return (
      <a href={item.path} key={item.path}>
        <div
          className={`menu-item ${currentPath === item.path ? 'active' : ''} ${isChild ? 'child-menu-item' : ''}`}
          style={isChild ? { paddingLeft: '15px' } : {}}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      </a>
    );
  };


  return (
    <div className="side-bar sidebar" id="sidebar">
  
  
 {menuItems.length !== 0 && 
<div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px',flexWrap:'wrap'}}><img src="\images\coslologo.png" alt="" style={{width:'80px'}}/>
<label style={{fontWeight:'600'}}>Coslomart Seller Admin</label></div>
}


      {/* Menu Items */}
      <div className="menu">

      {menuItems.map((item) => renderMenuItem(item))}

{issuperadmin === false && <div className='menu-item' onClick={handleLogout}>
              <i className='fas fa-sign-out-alt' style={{color:'red'}}></i>
              <span>Log Out</span>
            </div>
            }

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