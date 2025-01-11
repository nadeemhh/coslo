"use client"
import "../landing-page.css";
import Button from '../component/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();


  const handleGoBack = () => {
    router.back(); // Navigate to the previous URL
  };

    const handleShowSidebar = () => {
      document.getElementById('sidebar').style.transform = 'translateY(0)';
    };
  
    return (
      <>
        {/* <span>nav bar</span>
        <button className="show-btn" onClick={handleShowSidebar}>
          Show
        </button> */}

<nav className="navbar">
      <div className="navbar-container navbar-container-row">
        
      <div className='bnamehide'>
      <Link href="/home">
        <div className="logo">
          <h1>Coslo.com</h1>
        </div>
        </Link>
        
        <a href="/home/login">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}>  log in </Button>
        </a>
        </div>

        <Link href="/home">
        <div className="logo logodesk">
          <h1>Coslo.com</h1>
        </div>
        </Link>

<div className="search-pre">
        <img src="\icons\pre.svg" alt=""  className="show" onClick={handleGoBack}/>

        <div className="search-bar">
          <div className="dropdown">
            <select name="" id="" className="dropdown-btn hide">
               <option value="">Products</option>
               <option value="">Supplier</option>
               </select>
          
          </div>
          <input type="text" placeholder="Search Products" />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
        </div>
       
       
        <div className="action-buttons hide">
       
        <a href="/home/createaccountsup">
          <Button rightIcon="\icons\right.svg" className='hide'>Want to Sell</Button>
          </a>

          <a href="/home/login">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}>  log in </Button>
        </a>

        <a href="/home/createaccount">
      <Button rightIcon="\icons\right.svg" className='hide'> Want to Buy</Button>
          </a>

          {/* <div className="profile0">
        <img
          src="/images/user1.png"
          alt="Profile"
          className="profile-image0"
        />
        <div className="profile-info0">
          <p style={{fontWeight:'600'}}>Welcome Faiz</p>
         <p>My Account & Orders</p>
        </div>
      </div>

          <a href="/home/createaccount">
      <Button rightIcon="\icons\carticon.svg" className='hide'>Cart</Button>
          </a> */}
         
        </div>

       

      </div>


      {/* <div className="categories hide">
        <a href="#" style={{display:'flex'}}>All Categories <img src="\icons\3dot.svg" alt="" /></a>
        <a href="#">
          Electronics Supplies <i className="fas fa-angle-down"></i>
        </a>
        <a href="#">
          Fashion & Clothing <i className="fas fa-angle-down"></i>
        </a>
        <a href="#">
          Food & Beverage <i className="fas fa-angle-down"></i>
        </a>
      </div> */}
    </nav>
      </>
    );
  };

  export default NavBar;