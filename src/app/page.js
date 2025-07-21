
import Link from 'next/link';
import "./page.module.css";
import "./landing-page.css";
import "./rootpage.css";
import "./component/component-css/navbar.css";
import Button from './component/button';
import PlansTable from './component/planstables.js';
import Footer from './component/footer.js'
import Categorylist from './component/threeCategorylist.js'

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

          India's First  Hybrid E-Commerce Platform<br />

Real Estate, Products and Services<br />

 B2B and  B2C in single platform
      
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


  {/* A Free B2B Marketplace That Puts You in Control */}

      <section className="marketplace-section229">
      <div className="container229">
        <h2 className="heading229">A Free B2B Marketplace That Puts You in Control</h2>
        <p className="description229">
          Quit waiting for opportunities to find you—at Coslomart we give every business room to shine at no start-up cost.
          As our marketplace costs nothing to join, you can list products, search for suppliers, and connect without barriers.
        </p>
        <div className="card-grid229">
          <div className="card229">
            <h3 className="card-title229">
              <i className="fas fa-tags icon229"></i> Zero Listing Fees
            </h3>
            <p className="card-text229">Craft catalogs, update stock, and reach thousands of ready buyers at no charge.</p>
          </div>
          <div className="card229">
            <h3 className="card-title229">
              <i className="fas fa-user-check icon229"></i> Verified Profiles
            </h3>
            <p className="card-text229">Earn trust with check-mark seals and supplier badges that speak for you.</p>
          </div>
          <div className="card229">
            <h3 className="card-title229">
              <i className="fas fa-lightbulb icon229"></i> Intuitive Platform
            </h3>
            <p className="card-text229">Smart search, AI tips, and a clean interface make daily trading a breeze.</p>
          </div>
          <div className="card229">
            <h3 className="card-title229">
              <i className="fas fa-shield-alt icon229"></i> Secure Transactions
            </h3>
            <p className="card-text229">Choose payment gateways with escrow so every deal stays safe.</p>
          </div>
        </div>
      </div>
    </section>


    {/* explore categories */}

    <div style={{padding:'15px'}}>
<Categorylist/>
</div>

{/* Coslomart—Intro */}
 <section className="intro-container845">
      <h2 className="intro-heading845">
        <i className="fas fa-industry icon845"></i> Coslomart—India's Premier B2B Marketplace Strengthening Your Supply Chain
      </h2>
      <p className="intro-text845">
        Coslomart is India's leading business-to-business marketplace for buying and selling with ease. No matter whether you are trying to control procurement or expand your reach, this unique B2B e-commerce India platform facilitates smooth trade throughout sectors.
      </p>
      <a href='/auth/sup-manu/choose' className="cta-box845">
        <i className="fas fa-sign-in-alt icon845"></i>
        <p className="cta-text845">Join Coslomart Free—Start Trading Today</p>
      </a>
    </section>

    {/* Why Choose Us Section */}
     <div className="container545">
      <h2 className="heading545">
        <i className="fas fa-check-circle icon545"></i> Why choose <span className="brand545">Coslomart?</span>
      </h2>
      <p className="paragraph545">
        Businesses can easily rise and fall on the scarcity of resources that they offer. They do not have any control over when someone wants to buy what they sell. No longer will buyers or sellers determine when a trader will turn up. Having no expenses allows access to unrestricted trading as well as switching between buyer’s lists and suppliers while expanding click-away along with simple creation of catalogs on a free B2B marketplace.
      </p>
      <p className="paragraph545">
        Purchase products without listing fees, update catalogs freely, and discover thousands of qualified buyers—all without cost. Participants can boost their reputation using supplier badges, verification seals, and showcase holders, leading their trust rate. User Interface comes with easy dashboards along with advanced search options, streamlining ease for trading. All dealings fortifying dependable seller parties locked claim over transaction reimbursement gateways are strewn across safe escrow payments on this secure business-to-business marketplace.
      </p>

      <div className="highlight545">
        <h3><i className="fas fa-globe icon545"></i> Overcome Barriers in B2B E-Commerce India</h3>
        <p className="paragraph545">
          From Buyers— Not limited to restocking bulk goods, sources for barebone materials always fix capturing the required necessary out-of-time streams, long-standing and hardest sought. Powerful ontology never misses marketplace relations, awaits retraining, and connects the right working partners. Advanced filters get you anywhere—instantly.
        </p>
      </div>

      <div className="features545">
        <div className="feature545">
          <i className="fas fa-file-signature icon545"></i>
          <h4>Verified RFQs & Leads</h4>
          <p>Utilize our Request for Quotation feature to access daily buyer demand.</p>
        </div>
        <div className="feature545">
          <i className="fas fa-chart-bar icon545"></i>
          <h4>Analytics Dashboard</h4>
          <p>Monitor and measure buyer activities including views and conversions.</p>
        </div>
        <div className="feature545">
          <i className="fas fa-user-shield icon545"></i>
          <h4>Secure Chat</h4>
          <p>Maintain privacy of personal information while discussing business deals.</p>
        </div>
        <div className="feature545">
          <i className="fas fa-mobile-alt icon545"></i>
          <h4>Mobile-Friendly</h4>
          <p>Transact effortlessly via laptop, tablet, or phone.</p>
        </div>
      </div>

      <div className="closing545">
        <p className="paragraph545">
          Coslomart continues to lead as one of the best B2B ecommerce websites in India with these features. A trusted name in B2B e-commerce India, it offers unmatched value through its free B2B marketplace setup.
        </p>

        <h3 className="cta-heading545"><i className="fas fa-bolt icon545"></i> Ready To Transform Your B2B Experience?</h3>
        <p className="paragraph545">
          No Cost. No Complexity. Just Commerce.
        </p>
        <p className="paragraph545">
          Coslomart makes it easy for both importers and growing SMEs by providing complimentary features, a reliable ecosystem, and an intuitive, seamless flow interface, which positions it as the best B2B marketplace for modern trade.
        </p>
        <p className="paragraph545">
          Always be a step ahead with Coslomart, your access to India’s premier business-to-business marketplaces and one of the best B2B ecommerce websites in the region.
        </p>
      </div>
    </div>
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
  
    {/* <section className="pricing-table-101">

    <h1 className="title101">Subscription Plans</h1>

<PlansTable/>
      
    </section>
 */}


    {/* faqs */}

<div className="faqs-container249">
      <h2 className="faqs-title249">FAQs</h2>

      <div className="faq-item249">
        <input type="checkbox" id="faq1-249" className="faq-toggle-box249" defaultChecked/>
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
