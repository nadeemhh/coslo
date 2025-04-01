"use client"
import "../landing-page.css";
import "../component/component-css/btnbadge.css";
import Button from '../component/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState ,useEffect} from 'react';
import BuyerAuthCheck from '../component/buyerauthcheck.js';
import cartcountget from '../component/cartcountget.js';


const NavBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setuser] = useState(null);

  BuyerAuthCheck(setuser)

  
  const handleGoBack = () => {
    router.back(); // Navigate to the previous URL
  };

    const handleShowSidebar = () => {
      document.getElementById('sidebar').style.transform = 'translateY(0)';
    };

      // ✅ Handles search on button click
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const selectedOption = document.querySelector('.filtertype').options[document.querySelector('.filtertype').selectedIndex]; // Get selected <option>
        const selectedName = selectedOption.getAttribute("value"); 
console.log(selectedName)
    //  router.push(`/home/filters?query=${encodeURIComponent(searchQuery)}&type=${selectedName}`);
    window.location.href = `/home/filters?query=${encodeURIComponent(searchQuery)}&type=${selectedName}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  useEffect(() => {
    cartcountget();
  },[]);


     
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
          <h1>Coslomart.com</h1>
        </div>
        </Link>
        
        {user === null && <a href="/home/login" >
        <Button backgroundColor = '#5706fdbd' textColor="white" >Buyer Login</Button>
        </a>}

        </div>

        <Link href="/home">
        <div className="logo logodesk">
          <h1>Coslomart.com</h1>
        </div>
        </Link>

<div className="search-pre">
        <img src="\icons\pre.svg" alt=""  className="show" onClick={handleGoBack}/>

        <div className="search-bar">
          <div className="dropdown">
            <select name="" id="" className="dropdown-btn hide filtertype">
               <option value="Products">Products</option>
               <option value="seller">seller</option>
               </select>
          
          </div>

          <input type="text" placeholder="Search Products" className="SearchProducts"  value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}/>

          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        </div>
       
       
        <div className="action-buttons hide">
       
       {user ? <> 
       
       <Link href="/user/orders">
        <div className="profile0">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-image0"
        />
        <div className="profile-info0">
          <p style={{fontWeight:'600'}}>Welcome {user.name}</p>
         <p>My Account & Orders</p>
        </div>
      </div>
      </Link>

          <Link href="/home/cart">
      {/* <Button rightIcon="\icons\carticon.svg" className='hide'>Cart</Button> */}

      <button className="btn_abc123">
  <span className="btn_text88">Cart</span>
  <img src="\icons\carticon.svg" alt="cart-icon" className="btn_icon" />
  <span className="btn_badge77"></span>
</button>
          </Link>

     </> 
:

<>
<a href="/auth/sup-manu/choose">
          <Button rightIcon="\icons\right.svg" className='hide'>Want to Sell</Button>
          </a>

        <a href="/home/createaccount">
      <Button rightIcon="\icons\right.svg" className='hide'> Want to Buy</Button>
          </a>

          <a href="/home/login" >
        <Button backgroundColor = '#5706fdbd' textColor="white" >Buyer Login</Button>
        </a>
          </>}
         
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