const MobileFooter = () => (
    <div className="mobile-footer">
      <div className="footer-nav">
        <a href="/home" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="/home/Categories" className="nav-item">
          <i className="fas fa-th-list"></i>
          <span>Category</span>
        </a>
        <a href="/user/sidebar" className="nav-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/home/cart" className="nav-item">
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
        </a>
      </div>
    </div>
  );

  export default MobileFooter;