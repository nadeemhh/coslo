"use client"
import "../landing-page.css";
import "../component/component-css/btnbadge.css";
import "../component/component-css/navbar.css";
import Button from '../component/button';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { useState ,useEffect,useRef} from 'react';
import BuyerAuthCheck from '../component/buyerauthcheck.js';
import cartcountget from '../component/cartcountget.js';
import { LoadScript, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const NavBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setuser] = useState(null);
   const iconRef = useRef(null);
    const pathname = usePathname(); // detects route change
const [selectedFilter, setSelectedFilter] = useState("product");
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
   const [isproperty, setisproperty] = useState(null);
  const searchBoxRef = useRef(null);
    const [selectedBengaluruPlace, setSelectedBengaluruPlace] = useState("");

   const [bengaluruPlaces, setbengaluruPlaces] = useState([
  "AECS Layout",
  "Adugodi",
  "Agram",
  "Akshayanagar",
  "Amruthahalli",
  "Anand Nagar",
  "Anekal",
  "Anjanapura",
  "Arakere",
  "Ashok Nagar",
  "Attibele",
  "Bagalur",
  "Banashankari",
  "Banashankari Stage 2",
  "Banashankari Stage 3",
  "Banashankari Stage 5",
  "Banashankari Stage 6",
  "Banaswadi",
  "Bannerghatta",
  "Bannerghatta Road",
  "Basavanagudi",
  "Basaveshwaranagar",
  "Begur",
  "Bellandur",
  "Benson Town",
  "Bharath Nagar",
  "Bidadi",
  "Bilekahalli",
  "Bommanahalli",
  "Bommasandra",
  "Brookefield",
  "BTM Layout",
  "CV Raman Nagar",
  "Chamarajpet",
  "Chandapura",
  "Chikkabanavara",
  "Chikkajala",
  "Cooke Town",
  "Cox Town",
  "Cunningham Road",
  "Dasarahalli",
  "Devanahalli",
  "Doddanekkundi",
  "Domlur",
  "Dommasandra",
  "Ejipura",
  "Electronic City",
  "Frazer Town",
  "Ganganagar",
  "Girinagar",
  "Gottigere",
  "HAL Layout",
  "HBR Layout",
  "Hebbal",
  "Hennur",
  "Hoodi",
  "Horamavu",
  "Hompalaghatta",
  "Hosa Road",
  "Hosakerehalli",
  "HRBR Layout",
  "HSR Layout",
  "Hulimavu",
  "Indiranagar",
  "ISRO Layout",
  "ITPL",
  "Jakkur",
  "Jalahalli",
  "Jayanagar",
  "Jigani",
  "JP Nagar",
  "Kadubeesanahalli",
  "Kadugodi",
  "Kaggadasapura",
  "Kalyan Nagar",
  "Kammanahalli",
  "Kanakapura Road",
  "Kasturi Nagar",
  "Kathriguppe",
  "Kengeri",
  "Kodihalli",
  "Kodigehalli",
  "Koramangala",
  "KR Market",
  "KR Puram",
  "Kudlu Gate",
  "Kumaraswamy Layout",
  "Lalbagh Road",
  "Lavelle Road",
  "Lingarajapuram",
  "Madiwala",
  "Magadi Road",
  "Mahadevapura",
  "Majestic",
  "Malleshpalya",
  "Malleshwaram",
  "Marathahalli",
  "Mathikere",
  "Mico Layout",
  "Millers Road",
  "Murugeshpalya",
  "Mysore Road",
  "Nagavara",
  "Nagarabhavi",
  "Nandi Hills",
  "Padmanabhanagar",
  "Peenya",
  "Race Course Road",
  "Rajajinagar",
  "Rajarajeshwari Nagar",
  "Ramamurthy Nagar",
  "Richmond Town",
  "RT Nagar",
  "Sadashivanagar",
  "Sahakar Nagar",
  "Sanjay Nagar",
  "Sarjapur",
  "Shanti Nagar",
  "Shivaji Nagar",
  "Singasandra",
  "Sunkadakatte",
  "Thanisandra",
  "Ulsoor",
  "Uttarahalli",
  "Varthur",
  "Vasanth Nagar",
  "Vidyaranyapura",
  "Vijayanagar",
  "Whitefield",
  "Wilson Garden",
  "Yelahanka",
  "Yeswanthpur",
  "Yeshwanthpur"
]);

  BuyerAuthCheck(setuser)

  console.log(isproperty)
    // Handle Bengaluru place selection
  const handleBengaluruPlaceChange = (e) => {
    const selectedPlace = e.target.value;
    setSelectedBengaluruPlace(selectedPlace);
    // Store in localStorage if needed
   // localStorage.setItem("selectedBengaluruPlace", selectedPlace);
    console.log("Selected Bengaluru Place:", selectedPlace);

      if (selectedPlace.trim() !== "") {
    
    window.location.href = `/home/filters?query=${encodeURIComponent(selectedPlace)}&type=${'property'}`;
    
    }

  };

  const placeholderMap = {
  product: "Search Products",
  property: "Enter address to Search Property",
  service: "Search Services",
};


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

      const onLoad = () => {
   setTimeout(() => {

    const productType = localStorage.getItem("productType");
    
if(productType){ setSelectedFilter(productType);}
     

  }, 1000);
  };

  if (document.readyState === "complete") {
    onLoad(); // already loaded
  } else {
    window.addEventListener("load", onLoad); // wait for full load
    return () => window.removeEventListener("load", onLoad);
  }


  
setisproperty(window.location.href.includes("property")||window.location.href.includes("Real-Estate"))
  },[]);


  useEffect(() => {
    const el = iconRef.current;
    if (el) {
      el.classList.remove('animated-serachicon');
      void el.offsetWidth; // force reflow
      el.classList.add('animated-serachicon'); // restart animation
    }
  }, [pathname]); // run on pag

     
/////////// google map search code start


  // Replace with your actual Google Maps API key
  const googleMapsApiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;

    // Use useLoadScript hook instead of LoadScript component
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });


  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        const locationData = {
          address,
          latitude: lat,
          longitude: lng
        };

        setSelectedLocation(locationData);
        setSearchValue(address);
        
        // Log the stored data
        console.log('Stored Location Data:', locationData);

         if (searchValue.trim() !== "") {
      const selectedOption = document.querySelector('.filtertype').options[document.querySelector('.filtertype').selectedIndex]; // Get selected <option>
        const selectedName = selectedOption.getAttribute("value"); 
console.log(selectedName)
    
    window.location.href = `/home/filters?query=${encodeURIComponent(locationData.address)}&type=${'property'}`;
    }
      
      }
    }
  };

  
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

/////////// google map search code end


    return (
      <>
        {/* <span>nav bar</span>
        <button className="show-btn" onClick={handleShowSidebar}>
          Show
        </button> */}

<nav className="navbar">
      <div className="navbar-container navbar-container-row">
        
      <div className='bnamehide'>
      <a href="/home">
        <div className="logo logocontainer">
           <img src="\images\coslologonav.png" alt="logo" width={"40px"} />
         <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <h1>coslomart</h1>
         {isproperty && <p style={{color:'#1389F0',fontSize:'15px',marginLeft:'2px'}}>properties</p>}
         </div>
        </div>
        </a>
        
        {user === null &&  <a href="/home/login" className="loginbut">
     Buyer Login
        </a>}

        </div>

        <a href="/home">
        <div className="logo logocontainer logodesk">
         <img src="\images\coslologonav.png" alt="logo" width={"40px"} />
         <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <h1>coslomart</h1>
         {isproperty && <p style={{color:'#1389F0',fontSize:'17px',marginLeft:'2px'}}>properties</p>}
         </div>
        </div>
        </a>

<div className="search-pre">
        {/* <img src="\icons\pre.svg" alt="go back"  className="show" onClick={handleGoBack}/> */}

        <div className="search-bar">
          <div className="dropdown" style={{borderRight:'1.5px solid #9c9c9c'}}>
            {!isproperty ? (
              <select 
                name="" 
                id="" 
                className="dropdown-btn filtertype"   
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value)
                  localStorage.setItem("productType",e.target.value)
                }}
              >
                <option value="product">Products</option>
                <option value="property">Property</option>
                <option value="service">Service</option>
              </select>
            ) : (
              // Show Bengaluru places dropdown when isproperty is true
              <select 
                name="" 
                id="" 
                className="dropdown-btn filtertype location-filter"   
                value={selectedBengaluruPlace}
                onChange={handleBengaluruPlaceChange}
                style={{width:'90px'}}
              >
                <option value="">Locality</option>
                {bengaluruPlaces.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            )}
          
          </div>

          <input type="text"   placeholder={placeholderMap[selectedFilter]}
   className={`SearchProducts ${selectedFilter === "property" ? "hideelement" : ""}`}  value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
/> 

<div className="locationsearchdiv">


         {isLoaded && (
    <div style={{ display: selectedFilter === "property" ? "block" : "none" }}>
      <StandaloneSearchBox
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
      >
              <input
                type="text"
                  className={`SearchProducts ${selectedFilter !== "property" ? "hideelement" : ""}`}  
                value={searchValue}
                onChange={handleInputChange}
                placeholder={placeholderMap[selectedFilter]}
              />
             </StandaloneSearchBox>
    </div>
  )}

      
    </div>

       {selectedFilter !== "property" &&   <button className="search-btn" style={{marginRight:'10px'}} onClick={handleSearch}>
            <img  ref={iconRef} src="\icons\newsearchicon.svg" alt="search icon" />
          </button>}
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

          <a href="/home/login"  style={{border:"1px solid #0097ff",borderRadius: '4px'}} >
        <Button backgroundColor = '#ffffff' textColor="black" >Buyer Login</Button>
        </a>
          </>}
         
        </div>

       

      </div>

    </nav>
      </>
    );
  };

  export default NavBar;