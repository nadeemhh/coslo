"use client"
import "../../landing-page.css";
// import Button from '../component/button';
import Link from 'next/link';
import '../../component/component-css/adminpanelayout.css';
import { useEffect, useState } from 'react';

const NavBar = () => {
  
const [togglesidebar,settogglesidebar] = useState(true);

   const handleShowSidebar = (pos) => {
      console.log(pos)
      document.getElementById('sidebar').style.transform = `translateX(${pos})`;
    };

  useEffect(() => {

    if (typeof window !== "undefined") {
      
      document.querySelector('.adminemail').textContent=JSON.parse(localStorage.getItem("admindata"))?.email || "";
    }
  },[]);

   
  
    return (
      <>

<nav className="navbar" style={{padding:'5px',backgroundColor:'#F4F7FB'}}>
<h4 style={{margin:'0px',textAlign:'right'}} className='adminemail'></h4>

{togglesidebar ? <i className="fas fa-bars showsidebar" onClick={()=>{
  handleShowSidebar('0%')
  settogglesidebar(false)
}}></i>
:
<i className="fas fa-times showsidebar" style={{color:'red'}} onClick={()=>{
  handleShowSidebar('-100%')
  settogglesidebar(true)
}}></i>
}

    </nav>
      </>
    );
  };

  export default NavBar;