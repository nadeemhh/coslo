"use client"
import "../../landing-page.css";
import '../../component/component-css/adminpanelayout.css';
// import Button from '../component/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const NavBar = () => {

  const [issuperadmin, setissuperadmin] = useState(false);
  const [togglesidebar, settogglesidebar] = useState(true);

  const handleShowSidebar = (pos) => {
    console.log(pos)
    document.getElementById('sidebar').style.transform = `translateX(${pos})`;
  };

  useEffect(() => {

    if (typeof window !== "undefined") {

      document.querySelector('.adminemail').textContent = JSON.parse(localStorage.getItem("sellerdata"))?.email || "";

      if (localStorage.getItem('issuperadmin') === 'true') {
        setissuperadmin(true)
      }
    }
  }, []);


  const handleGoBackpanel = () => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('issuperadmin')
    localStorage.removeItem('token')
    localStorage.removeItem('sellerdata');

    window.location.href = '/admin/manufacturerssuppliers/';

  };


  return (
    <>

      <nav className="navbar" style={{ backgroundColor: '#F4F7FB' }}>

        {issuperadmin && <button style={{ backgroundColor: 'red', color: 'white', padding: '5px', border: 'none', float: 'left' }} onClick={handleGoBackpanel}>logout</button>}


        <h4 style={{ margin: '0px', textAlign: 'right' }} className='adminemail'></h4>

        {togglesidebar ? <i className="fas fa-bars showsidebar" style={{ fontSize: '20px' }} onClick={() => {
          handleShowSidebar('0%')
          settogglesidebar(false)
        }}></i>
          :
          <i className="fas fa-times showsidebar" style={{ fontSize: '20px', color: 'red' }} onClick={() => {
            handleShowSidebar('-100%')
            settogglesidebar(true)
          }}></i>
        }

      </nav>
    </>
  );
};

export default NavBar;