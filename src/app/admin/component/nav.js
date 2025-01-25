"use client"
import "../../landing-page.css";
// import Button from '../component/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavBar = () => {
  useEffect(() => {

    if (typeof window !== "undefined") {
      
      document.querySelector('.adminemail').textContent=JSON.parse(localStorage.getItem("admindata"))?.email || "";
    }
  },[]);

    const handleShowSidebar = () => {
      document.getElementById('sidebar').style.transform = 'translateY(0)';
    };
  
    return (
      <>

<nav className="navbar" style={{padding:'5px',backgroundColor:'#F4F7FB'}}>
<h4 style={{margin:'0px',textAlign:'right'}} className='adminemail'></h4>
    </nav>
      </>
    );
  };

  export default NavBar;