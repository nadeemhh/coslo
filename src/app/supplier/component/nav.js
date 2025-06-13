"use client"
import "../../landing-page.css";
// import Button from '../component/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const NavBar = () => {

  const [issuperadmin,setissuperadmin] = useState(false);

    const handleShowSidebar = () => {
      document.getElementById('sidebar').style.transform = 'translateY(0)';
    };

     useEffect(() => {
    
        if (typeof window !== "undefined") {
          
          document.querySelector('.adminemail').textContent=JSON.parse(localStorage.getItem("sellerdata"))?.email || "";

          if(localStorage.getItem('issuperadmin')==='true'){
            setissuperadmin(true)
          }
        }
      },[]);
  

      const handleGoBackpanel = () => {

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        localStorage.removeItem('issuperadmin')
  localStorage.removeItem('token')
  localStorage.removeItem('sellerdata');

        window.location.href ='/admin/manufacturerssuppliers/';

      };


    return (
      <>

<nav className="navbar" style={{padding:'5px',backgroundColor:'#F4F7FB'}}>

{issuperadmin && <button style={{backgroundColor:'red',color:'white',padding:'5px',border:'none',float:'left'}} onClick={handleGoBackpanel}>logout</button>}
    

<h4 style={{margin:'0px',textAlign:'right'}} className='adminemail'></h4>
    </nav>
      </>
    );
  };

  export default NavBar;