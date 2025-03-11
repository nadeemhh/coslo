"use client"
import "../../landing-page.css";
// import Button from '../component/button';
import Link from 'next/link';

const NavBar = () => {
    const handleShowSidebar = () => {
      document.getElementById('sidebar').style.transform = 'translateY(0)';
    };
  
    return (
      <>

<nav className="navbar" style={{padding:'5px',backgroundColor:'#F4F7FB'}}>
<h3 style={{margin:'0px',textAlign:'right'}}>Employee</h3>
    </nav>
      </>
    );
  };

  export default NavBar;