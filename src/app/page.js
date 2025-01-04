
import Link from 'next/link';
import "./page.module.css";
import "./landing-page.css";
import Button from './component/button';


export default function Home() {
  return (
    <>

{/* nav */}

<nav className="navbar">
      <div className="navbar-container">
        
        <div className='bnamehide'>
      <Link href="/home">
        <div className="logo">
          <h1>Coslo.com</h1>
        </div>
        </Link>

        {/* <a href="/home/login">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}> log in </Button>
        </a> */}

        
        <a href="#">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true}>About Us</Button>
        </a>
        </div>

        <Link href="/home">
        <div className="logo logodesk">
          <h1>Coslo.com</h1>
        </div>
        </Link>

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

       
        <div className="action-buttons">
       
        
        <a href="#">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true} className='hide'>Contact Us</Button>
        </a>
        <a href="#">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true} className='hide'>About Us</Button>
        </a>

          <a href="/home/login">
        <Button backgroundColor = '#ffffff' textColor="black"  border={true} className='hide'> log in </Button>
        </a>

        {/* <a href="/home/createaccount">
      <Button rightIcon="icons\right.svg" className='hide'> Want to Buy</Button>
          </a> */}
         
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

        <a href="/home/createaccountsup" >
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
        <p>Cancel anytime. We’ll send you a reminder 7 days before your trial ends.</p>
        <button className="btn">Become a Seller ➔</button>
      </div>
    </section>

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
    
    <section className="how-it-works">
      <h2>How it works?</h2>

      <div className="section">
        <h3>For Wholesalers / Retailers / Buyers</h3>
        <div className="steps-container">
          <div className="step">
            <div className="circle">1</div>
            <h4>Sign Up</h4>
            <p>Create your free account.</p>
          </div>
          <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
          <div className="step">
            <div className="circle">2</div>
            <h4>Explore</h4>
            <p>Browse products on your needs.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
          <div className="step">
            <div className="circle">3</div>
            <h4>Connect</h4>
            <p>Connect with verified Manufacturers/Suppliers.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
          <div className="step">
            <div className="circle">4</div>
            <h4>Trade</h4>
            <p>Close deals with secure payments.</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>For Manufacturers / Suppliers</h3>
        <p className="highlight">1st Month Free</p>
        <div className="steps-container">
          <div className="step">
            <div className="circle">1</div>
            <h4>Profile Verification</h4>
            <p>Suppliers' profiles are verified through government IDs, address proofs & business docs.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
          <div className="step">
            <div className="circle">2</div>
            <h4>Phone and Email Verification</h4>
            <p>Suppliers contact information is verified through SMS and email validation.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
          <div className="step">
            <div className="circle">3</div>
            <h4>Add Products & Categories</h4>
            <p>Seamlessly add products with various customisations.</p>
          </div>
              <img className="arrowimg" src="icons\Arrow 1.svg"  alt="" />
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

      <table className="table-101">
        <thead className="thead-101">
          <tr>
            <th className="feature-header-101">Features</th>
            <th className="plan-header-101">Free</th>
            <th className="plan-header-101">Monthly</th>
            <th className="plan-header-101">Yearly</th>
          </tr>
        </thead>
        <tbody className="tbody-101">
          <tr>
            <td>Leads</td>
            <td>0 /Month</td>
            <td>70 /Month</td>
            <td>80 /Month</td>
          </tr>
          <tr>
            <td>Customer Support</td>
            <td><i className="fas fa-times not-available"></i></td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
          </tr>
          <tr>
            <td>Order Analytics</td>
            <td><i className="fas fa-times not-available"></i></td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
          </tr>
          <tr>
            <td>Inventory Management</td>
            <td><i className="fas fa-check available"></i></td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
            <td>
            <i className="fas fa-check available"></i>
            </td>
          </tr>
         
          <tr>
            <td>Purchase Plan</td>
            <td>
              
            </td>
            <td>
                <button style={{backgroundColor:'#1389F0',padding:'2px 5px',border:'none',color:'white',borderRadius:'2px'}}>buy</button>
            </td>
            <td>
                <button style={{backgroundColor:'#1389F0',padding:'2px 5px',border:'none',color:'white',borderRadius:'2px'}}>buy</button>
            </td>
          </tr>

        </tbody>
      </table>
    </section>

    {/* Testimonials Section */}
   
    <section className="testimonials-section">
      <h1>What our Happy users Says ?</h1>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="quote">
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>We gained new clients and expanded to new markets effortlessly!</p>
          <div className="user-info">
            <img src="images/user.jpg" alt="User" />
            <div>
              <h4>Faiz Iqbal</h4>
              <p>CEO @ Galaxy Inc.</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="quote">
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>The platform’s analytics helped us optimize our listings.</p>
          <div className="user-info">
            <img src="images/user.jpg" alt="User" />
            <div>
              <h4>Ibrahim Iqbal</h4>
              <p>CEO @ Galaxy Inc.</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div>
            <img src="icons/quote.svg" alt="Quote" />
          </div>
          <p>We gained new clients and expanded to new markets effortlessly!</p>
          <div className="user-info">
            <img src="images/user.jpg" alt="User" />
            <div>
              <h4>Faiz Iqbal</h4>
              <p>CEO @ Galaxy Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
   
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Contact Info */}
        <div className="footer-section company-info">
          <h2 className="company-name">Coslo</h2>
          <p>India’s Trusted <strong>B2B</strong> E-commerce Partner.</p>
          <div className="contact">
            <p>
              <span><img src="icons\address.svg" alt="Facebook" /></span> 123 Trade Street, Business Hub,
              <br />
              New Delhi, India - 110001
            </p>
            <p>
              <span><img src="icons\phone.svg" alt="Facebook" /></span> +91-9876543210
            </p>
          </div>
          <p>social media</p>
          <div className="social-media">
            <a href="#">
              <img src="icons\Social Icons1.svg" alt="Facebook" />
            </a>
            <a href="#">
              <img src="icons\Social Icons2.svg" alt="Twitter/X" />
            </a>
            <a href="#">
              <img src="icons\Social Icons3.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="icons\Social Icons4.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Policies */}
        <div className="footer-section-parent">
          <div className="footer-section policies">
            <h3>Policies</h3>
            <ul>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-section solutions">
            <h3>Our Solutions</h3>
            <ul>
              <li>
                <a href="#">For Retailers</a>
              </li>
              <li>
                <a href="#">For Manufacturers</a>
              </li>
              <li>
                <a href="#">Product Categories</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section support">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Coslo. All Rights Reserved.</p>
      </div>
    </footer>

  </>
  );
}
