"use client";

import './component-css/usersidebar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Usersidebar = () => {
  const pathname = usePathname();
  // const [currentPath, setCurrentPath] = useState('');
console.log(pathname)
  // useEffect(() => {
  //   console.log(window.location.pathname)
  //   // Set the current path when the component mounts
  //   if (typeof window !== 'undefined') {
  //     setCurrentPath(window.location.pathname);
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('buyer')
    window.location.href = '/home/login';
  };

  const menuItems = [
    { path: '/user/orders', icon: 'fas fa-box', label: 'My Orders' },
    { path: '/user/myaccount', icon: 'fas fa-user', label: 'My Account' },
    { path: '/user/notification', icon: 'fas fa-bell', label: 'Notifications' },
    { path: '/user/wishlist', icon: 'fas fa-heart', label: 'Wishlist' },
    { path: '/user/feedback', icon: 'fas fa-comment', label: 'Feedback' },
  ];

  return (
    <div className="side-bar sidebar" id="sidebar usersidebar">
      <div className="profile">
        <img
          src="/images/user1.png"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h3>Faiz Iqbal</h3>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

<Verifybut handleLogout={handleLogout}/>

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


function Verifybut({handleLogout}) {
  const [user, setuser] = useState(false);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('buyer')))
    setuser(JSON.parse(localStorage.getItem('buyer')).isVerified)
  }, []);

  const handledata = (e) => {
    e.preventDefault();

    document.querySelector('.loaderoverlay').style.display='flex';

    const userData = {
      email:JSON.parse(localStorage.getItem('buyer')).email
    };

     // Retrieve the token from localStorage, if it exists


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/send-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
         console.log(data)
         document.querySelector('.loaderoverlay').style.display='none';
        
alert(data.message)
handleLogout()
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        setError(err.message);
      });
  };

  return(

    <>
  {user === false &&  <button style={{backgroundColor:'#34b334',padding:'7px',color:'white',margin:'10px',border:'none',borderRadius:'10px'}} onClick={handledata}>Verify Your Account</button>}

    
    </>
  )
}