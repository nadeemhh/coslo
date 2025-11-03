"use client"
import "../../landing-page.css";
// import Button from '../component/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavBar = () => {
 const [togglesidebar,settogglesidebar] = useState(true);

    const handleShowSidebar = (pos) => {
      console.log(pos)
      document.getElementById('sidebar').style.transform = `translateX(${pos})`;
    };

    
  
    return (
      <>

<nav className="navbar" style={{padding:'5px',backgroundColor:'#F4F7FB'}}>
<h4 style={{margin:'0px',textAlign:'right'}} className='adminemail'>Sales Admin</h4>

{togglesidebar ? <i className="fas fa-bars showsidebar" style={{fontSize:'22px'}} onClick={()=>{
  handleShowSidebar('0%')
  settogglesidebar(false)
}}></i>
:
<i className="fas fa-times showsidebar" style={{color:'red',fontSize:'22px'}} onClick={()=>{
  handleShowSidebar('-100%')
  settogglesidebar(true)
}}></i>
}

    </nav>
      </>
    );
  };

  export default NavBar;