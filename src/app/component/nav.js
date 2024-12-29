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
        
        <a href="/home/createaccount">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}> Sign In </Button>
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
          <div className="dropdown hide">
            <button className="dropdown-btn">
              Products <i className="fas fa-angle-down"></i>
            </button>
          </div>
          <input type="text" placeholder="Cameras Invisible 30mm" />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
        </div>
       
        <div className="action-buttons hide">
       
          <Button rightIcon="\icons\right.svg" className='hide'>Want to Sell</Button>
          
          <a href="/home/createaccount">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}> Sign In </Button>
        </a>

      <Button rightIcon="\icons\right.svg" className='hide'> Want to Buy</Button>
          
         
        </div>
      </div>


      <div className="categories hide">
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
      </div>
    </nav>
      </>
    );
  };

  export default NavBar;