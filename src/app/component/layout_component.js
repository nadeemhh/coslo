// NavBar Component
const NavBar = () => (
    <div className="nav-bar">
      <span>nav bar</span>
      <button className="show-btn">show</button>
    </div>
  );
  
  // Sidebar Component
  const Sidebar = () => (
    <div className="side-bar" id="sidebar">
      <span>side bar</span>
      <button className="close-btn">X</button>
    </div>
  );
  
  // MainContent Component
  const MainContent = () => (
    <div className="main-content">
      <span>main</span>
    </div>
  );
  
  // Footer Component
  const Footer = () => (
    <div className="footer">
      <span>footer</span>
    </div>
  );
  
  // MobileFooter Component
  const MobileFooter = () => (
    <div className="mobile-footer">
      <div className="footer-nav">
        <a href="#" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-th-list"></i>
          <span>Category</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
        </a>
      </div>
    </div>
  );
  
  // MyContainer Component
  const MyContainer = () => (
    <div className="mycontainer">
      <NavBar />
      <div className="content-wrapper">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
      <MobileFooter />
    </div>
  );
  
  export default MyContainer;
  