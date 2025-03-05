"use client"
import './component-css/sidebar.css'
import { useEffect,useState } from 'react';
import { usePathname } from 'next/navigation';  // Import usePathname from next/navigation
import Link from 'next/link';

const Sidebar = () => {

  const [show,setshow]=useState(null)
  const pathname = usePathname(); // Get the current pathname from next/navigation
  const [data,setdata] = useState([]);
  const [childCategories, setChildCategories] = useState({});

  
  const handleHideSidebar = () => {
    document.getElementById('sidebar').style.transform = 'translateY(100%)';
  };

  useEffect(() => {
    const handleSidebarVisibility = () => {
      const sidebar = document.getElementById('sidebar');
      const isHomePage = pathname === '/home/filters';  // Check if current page is '/home'
      const mediaQuery = window.matchMedia('(max-width: 768px)');  // Check screen size

      console.log(isHomePage, !mediaQuery.matches);
      if (isHomePage) {
        setshow(true);
        handledata()
      } else if (mediaQuery.matches) {
        setshow(false);
      } else {
        setshow(false);  // Ensure the sidebar is hidden when conditions are not met
      }
    };

    // Initial logic execution
    handleSidebarVisibility();

    // Add event listener to handle window resize
   // window.addEventListener('resize', handleSidebarVisibility);

    // Cleanup event listener on unmount
    return () => {
     // window.removeEventListener('resize', handleSidebarVisibility);
    };
  }, [pathname]);  // Add `pathname` as a dependency so it re-runs when the path changes


 

    

  const handledata = () => {
    
 
   document.querySelector('.loaderoverlay').style.display='flex';



   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/all`, {
     method: 'GET',
    
   })
     .then((response) => {
       if (response.ok) {
         return response.json();
       } else {
         return response.json().then((errorData) => {
           throw new Error(errorData.message || 'Failed. Please try again.');
         });
       }
     })
     .then((data) => {
           console.log(data)
           setdata([...data])
          document.querySelector('.loaderoverlay').style.display='none';
       // Successfully logged in
      // window.location.href = '/Employee/Onboarding';
      
     })
     .catch((err) => {
       document.querySelector('.loaderoverlay').style.display='none';
       console.log(err)
     });
 };


 const fetchChildCategories = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/all/${id}`);
    if (!response.ok) throw new Error("Failed to fetch subcategories");

    const result = await response.json();
    setChildCategories((prev) => ({ ...prev, [id]: result }));
  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  data.forEach((category) => {
    if (!childCategories[category.id]) {
      fetchChildCategories(category.id);
    }
  });
}, [data]);

  return (
    show ?
    <div className="side-bar sidebar filtersidebar" id="sidebar">
     {/* <h2 style={{fontSize:'19px',fontWeight:'600',marginBottom:'0px'}}>Filters</h2> */}
      <button className="close-btn" onClick={handleHideSidebar}>X</button>

{/* Location Filter */}
{/* <div className="filter-section">
        <h3 style={{marginTop:'0px'}}>By Location</h3>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search Location"
            className="search-box"
          />
          <div className="search-icon"><i className="fas fa-search"></i></div>
          
        </div>
        <ul className="filter-list">
          <li>All Locations</li>
          <li>Delhi</li>
          <li>Gurgaon</li>
          <li>Noida</li>
          <li>Kanpur</li>
          <li>Ghaziabad</li>
          <li>Pune</li>
          <li>Mumbai</li>
          <li>Bengaluru</li>
        </ul>
      </div> */}

      {/* Category Filter */}
      <div className="filter-section">
        <h3 style={{fontSize:'22px',marginBottom:'40px'}}>Categories</h3>
        {/* <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search Category"
            className="search-box"
          />
          <div className="search-icon"><i className="fas fa-search"></i></div>
        </div> */}
        {/* <div className="category">
          <p className="category-heading">Electronics › Smartphones</p>
          <ul className="filter-list">
            <li>Smartphones</li>
            <li>Mobile Cases</li>
            <li>Mobile Accessories</li>
            <li>Headphones</li>
            <li>Gaming Consoles</li>
          </ul>
          <button className="view-more">View More</button>
        </div> */}

{data.map((category) => (
          <div className="category" key={category.id}>
            <h4>{category.name}</h4>
            <ul className="filter-list">
              {childCategories[category.id]?.map((subCategory) => (
                <Link href={`/home/Categories/subCategories/allproducts/?id=${subCategory.id}&category=${subCategory.name}`} key={subCategory.id}>
                <li>{subCategory.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        ))}

      
      <div className="category">
          {/* <h4>Food & Beverages</h4>
          <ul className="filter-list">
            <li>Chips & Crackers</li>
            <li>Biscuits</li>
            <li>Soft Drinks</li>
            <li>Meat Products</li>
            <li>Seafoods</li>
            <li>Cakes & Pastry</li>
          </ul> */}
          {/* <button className="view-more">View More</button> */}
        </div>

        <div className="category">
          {/* <h4>Fashion & Clothing</h4>
          <ul className="filter-list">
            <li>Mens Wear</li>
            <li>Womans Wear</li>
            <li>Kids Wear</li>
            <li>Sneakers</li>
            <li>Formals</li>
            <li>Bags & Wallets</li>
            <li>Sunglasses</li>
          </ul> */}
        </div>
      </div>
    </div>:
    <></>
  );
};

  export default Sidebar;
  