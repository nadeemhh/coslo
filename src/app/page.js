
import Link from 'next/link';
import "./page.module.css";
import "./landing-page.css";
import "./component/component-css/navbar.css";
import Button from './component/button';
import PlansTable from './component/planstables.js';
import Footer from './component/footer.js'
import Categorylist from './component/categorylist.js'

export const metadata = {
  title: "Coslomart :B2B Marketplace for Top Manufacturers, Buyers, Suppliers",
  description: "Coslomart is India’s largest B2B marketplace. Best B2B portal for top manufacturers, suppliers, Buyres & dealers. Buy or sell with an amazing experience and grow your business globally.",
  keywords: "business to business marketplace, best b2b ecommerce websites, free b2b marketplace, B2B e-commerce India, Best B2B Marketplace, b2b shopping website",
  icons: {
    icon: "images/coslomartfavicon.jpg",
  },
  alternates: {
      canonical: `https://www.coslomart.com/`,
    },
};




export default function Home() {
  return (
    <>


{/* nav */}

<nav className="navbar">
      <div className="navbar-container">
        
        <div className='bnamehide'>
      <Link href="/home">
        <div className="logo">
          <h1>coslomart.com</h1>
        </div>
        </Link>

        {/* <a href="/home/login">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}> log in </Button>
        </a> */}

        
        <a href="/home/about-us">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}>About Us</Button>
        </a>
        </div>

        <Link href="/home">
        <div className="logo logodesk">
          <h1>coslomart.com</h1>
        </div>
        </Link>

        <a className="search-bar" href='/home'>
          <div className="dropdown">
            <select name="" id="" className="dropdown-btn hide">
               <option value="">Products</option>
               <option value="">Supplier</option>
               </select>
          
          </div>
          <input type="text" placeholder="Search Products" />
          <button className="search-btn">
            <i className="fas fa-search animated-serachicon"></i>
          </button>
        </a>

       
        <div className="action-buttons">
       
        
        {/* <a href="/home/about-us">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true} className='hide'>Contact Us</Button>
        </a> */}
        <a href="/home/about-us">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true} className='hide'>About Us</Button>
        </a>

        <a href="/auth/sup-manu/login" style={{border:"1px solid #0097ff",borderRadius: '4px'}} >
        <Button backgroundColor = '#ffffff' textColor="black"   >Seller Login</Button>
        </a>

        <a href="/home/login"  style={{border:"1px solid #0097ff",borderRadius: '4px'}} >
        <Button backgroundColor = '#ffffff' textColor="black" >Buyer Login</Button>
        </a>

       
         
        </div>
      </div>


      {/* <div className="categories">
        <a href="#" style={{display:'flex'}}>All Categories <img src="icons\3dot.svg" alt="" /></a>
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

    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <h1>
      
         India's First Hybrid E commerce Platform.<br />
         B2B, B2C & D2C in a single platform.<br />
      
        </h1>
        <div className="hero-buttons">

        <a href="/home" >
        <Button rightIcon="icons\right.svg" >Explore</Button>
        </a>

        <a href="/auth/sup-manu/choose" >
        <Button rightIcon="icons\right2.svg" backgroundColor = '#ffffff' textColor="black" >Want to Sell</Button>
        </a>

        <a href="/home/createaccount" >
        <Button rightIcon="icons\right2.svg" backgroundColor = '#ffffff' textColor="black" >Want to Buy</Button>
        </a>
          {/* <a href="#" className="b1">Explore →</a>
          <a href="#" className="b2">Want to Sell →</a>
          <a href="#" className="b2">Want to Buy →</a> */}

        </div>
      </div>
    </section>

    {/* Free for Buyers Section */}
    <section className="free-section">
      <div className="icon">
        <div className="commission-box">
          <p className="zero">0</p>
          <p className="commission">COMMISSION</p>
          {/* <p className="trade">TRADE</p> */}
        </div>
      </div>
      <div className="content">
        <h2>Free For Buyers & Sellers</h2>
        <p>Coslomart-India's Go-To B2B Marketplace That Strengthens Your Supply Chain</p>
        <a href="/auth/sup-manu/choose" >
        <Button rightIcon="icons\right.svg" >Become a Seller</Button>
        </a>
      </div>
    </section>


    {/* explore categories */}

    <div style={{padding:'15px'}}>
<Categorylist/>
</div>

    {/* Why Choose Us Section */}
    <section className="why-choose-us">
      <h2 style={{color:'white'}}>Why choose us?</h2>
      <div className="features-container">
        <div className="feature-box">
          <h3>Millions of business offerings</h3>
          <p>Explore products and suppliers for your business from millions of offerings in India.</p>
        </div>
        <div className="feature-box">
          <h3>Assured quality and transactions</h3>
          <p>Ensure production quality from verified suppliers, with your orders protected from payment to delivery.</p>
        </div>
        <div className="feature-box">
          <h3>One-stop trading solution</h3>
          <p>Order seamlessly from product/supplier search to order management, payment, and fulfillment.</p>
        </div>
        <div className="feature-box">
          <h3>Tailored trading experience</h3>
          <p>Get curated benefits, such as exclusive discounts, enhanced protection, and extra support.</p>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    
    <section className="how-it-works" id='HowItWorks'>
      <h2>How it works?</h2>

      <div className="section" id='ForRetailers'>
        <h3 style={{color:'#6d6d6d'}}>For Wholesalers / Retailers / Buyers</h3>
        <div className="steps-container">
          <div className="step">
            <div className="circle">1</div>
            <h4>Sign Up</h4>
            <p>Create your free account.</p>
          </div>
          <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">2</div>
            <h4>Explore</h4>
            <p>Browse products on your needs.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">3</div>
            <h4>Connect</h4>
            <p>Connect with verified Manufacturers/Suppliers.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">4</div>
            <h4>Trade</h4>
            <p>Close deals with secure payments.</p>
          </div>
        </div>
      </div>

      <div className="section" id='ForManufacturers'>
        <h3 style={{color:'#6d6d6d'}}>For Manufacturers / Suppliers</h3>
      
        <div className="steps-container">
          <div className="step">
            <div className="circle">1</div>
            <h4>Profile Verification</h4>
            <p>Suppliers' profiles are verified through government IDs, address proofs & business docs.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">2</div>
            <h4>Phone and Email Verification</h4>
            <p>Suppliers contact information is verified through SMS and email validation.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">3</div>
            <h4>Add Products & Categories</h4>
            <p>Seamlessly add products with various customisations.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="Arrow" />
          <div className="step">
            <div className="circle">4</div>
            <h4>Receive Orders from Anywhere in India</h4>
            <p>Effortlessly Manage and Fulfill Orders with Our Powerful Admin Panel.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Pricing Section */}
  
    <section className="pricing-table-101">

    <h1 className="title101">Subscription Plans</h1>

<PlansTable/>
      
    </section>



    {/* faqs */}

<div className="faqs-container249">
      <h2 className="faqs-title249">FAQs</h2>

      <div className="faq-item249">
        <input type="checkbox" id="faq1-249" className="faq-toggle-box249" />
        <label htmlFor="faq1-249" className="faq-question249">
          What is a business-to-business marketplace?
          <span className="faq-symbol249">+</span>
        </label>
        <div className="faq-answer249">
          A business-to-business marketplace is an online hub where firms order and sell goods in bulk. Coslomart links checked buyers and sellers from every corner of India, so trades stay smooth and secure.
        </div>
      </div>

      <div className="faq-item249">
        <input type="checkbox" id="faq2-249" className="faq-toggle-box249" />
        <label htmlFor="faq2-249" className="faq-question249">
          Which is the best B2B e-commerce website in India?
          <span className="faq-symbol249">+</span>
        </label>
        <div className="faq-answer249">
          Many users rank Coslomart among India's top B2B sites because it gives free listings, proves each profile, and offers a simple dashboard made for Indian SMEs and large firms.
        </div>
      </div>

      <div className="faq-item249">
        <input type="checkbox" id="faq3-249" className="faq-toggle-box249" />
        <label htmlFor="faq3-249" className="faq-question249">
          Is Coslomart a free B2B marketplace?
          <span className="faq-symbol249">+</span>
        </label>
        <div className="faq-answer249">
          Coslomart charges nothing to join or post products, so it suits new startups, growing SMEs, and bigger suppliers that want to step online without upfront costs.
        </div>
      </div>

      <div className="faq-item249">
        <input type="checkbox" id="faq4-249" className="faq-toggle-box249" />
        <label htmlFor="faq4-249" className="faq-question249">
          How does B2B e-commerce work on Coslomart?
          <span className="faq-symbol249">+</span>
        </label>
        <div className="faq-answer249">
          On Coslomart, a business signs up, either uploads items or searches for them, and then talks directly with verified partners, cutting out extra middlemen.
        </div>
      </div>

      <div className="faq-item249">
        <input type="checkbox" id="faq5-249" className="faq-toggle-box249" />
        <label htmlFor="faq5-249" className="faq-question249">
          Who can use Coslomart?
          <span className="faq-symbol249">+</span>
        </label>
        <div className="faq-answer249">
          Coslomart serves manufacturers, wholesalers, exporters, and distributors eager to expand in India's B2B scene through free, digital trading tools.
        </div>
      </div>
    </div>


    {/* Testimonials Section */}
   
    {/* <section className="testimonials-section" style={{marginBottom:'50px'}}>
      <h1>What our Happy users Says ?</h1>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="quote">
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>We gained new clients and expanded to new markets effortlessly!</p>
          <div className="user-info">
            <img src="images/coslouser.png" alt="User" />
            <div>
              <h4>Ajay Singh</h4>
              <p>CEO</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="quote">
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>The platform’s analytics helped us optimize our listings.</p>
          <div className="user-info">
            <img src="images/coslouser.png" alt="User" />
            <div>
              <h4>Rahul</h4>
              <p>CEO</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div>
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>Our business grew faster than ever—new clients, new markets, and endless opportunities!</p>
          <div className="user-info">
            <img src="images/coslouser.png" alt="User" />
            <div>
              <h4>Faiz Iqbal</h4>
              <p>CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    {/* Footer */}
   
  <Footer/>

  </>
  );
}
