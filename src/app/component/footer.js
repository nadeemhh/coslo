import "../landing-page.css";


const Footer = () => (
    <div className="footer">
    {/* Footer */}
   
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Contact Info */}
        <div className="footer-section company-info">
          <h2 className="company-name">Coslomart</h2>
          <p>India’s Trusted <strong>B2B, B2C and D2C </strong> E-commerce Partner.</p>
          <div className="contact">
            <p>
              <span><img src="\icons\address.svg" alt="Facebook" /></span> H.No 254, Millennium Valley, 
              <br />
              Hompalaghatta, Anekal, Bangalore - 562106
            </p>
            <p>
              <span><img src="\icons\phone.svg" alt="Facebook" /></span> +91 9429693768
            </p>
          </div>
          <p>social media</p>
          <div className="social-media">
            <a href="https://www.facebook.com/profile.php?id=61574036354947">
              <img src="\icons\Social Icons1.svg" alt="Facebook" />
            </a>
            <a href="https://youtube.com/@coslomart?si=97n_RqKLM71OBuT2">
              <img src="\icons\youtubeicon.svg" alt="youtubeicon" />
            </a>
            {/* <a href="#">
              <img src="\icons\Social Icons3.svg" alt="Instagram" />
            </a> */}
           
          </div>
        </div>

        {/* Policies */}
        <div className="footer-section-parent">
          <div className="footer-section policies">
            <h3>Policies</h3>
            <ul>
              <li>
                <a href="/home/TERMS-OF-USE">Terms of Use</a>
              </li>
              <li>
                <a href="/home/PrivacyPolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/home/ReturnPolicy">Return Policy</a>
              </li>
              <li>
                <a href="/home/cookiepolicy">Cookie Policy</a>
              </li>
              <li>
                <a href="/home/shippingpolicy">Shipping Policy</a>
              </li>
              {/* <li>
                <a href="#">Shipping Policy</a>
              </li> */}
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-section solutions">
            <h3>Our Solutions</h3>
            <ul>
              <li>
                <a href="/#ForRetailers">For Retailers</a>
              </li>
              <li>
                <a href="/#ForManufacturers">For Manufacturers</a>
              </li>
              <li>
                <a href="/home/Categories">Product Categories</a>
              </li>
              <li>
                <a href="/#HowItWorks">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section support">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/home/about-us">About Us</a>
              </li>
              <li>
                <a href="/home/contactus">Contact Us</a>
              </li>
              {/* <li>
                <a href="#">FAQs</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Coslomart. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  );

  export default Footer;