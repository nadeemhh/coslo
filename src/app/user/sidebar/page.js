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

<Verifybut handleLogout={handleLogout}/>

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



function Verifybut({handleLogout}) {
  const [user, setuser] = useState(null);

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
  {user !== null &&  (user ? <></>  : <button style={{backgroundColor:'#34b334',padding:'7px',color:'white',margin:'10px',border:'none',borderRadius:'10px',marginBottom:'20px'}} onClick={handledata}>Verify Your Email</button>)}
 </>
  )
}