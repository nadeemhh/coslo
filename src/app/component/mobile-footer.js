import Link from 'next/link';


const MobileFooter = () => (
    <div className="mobile-footer">
      <div className="footer-nav">
        <Link href="/home" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link href="/home/Categories" className="nav-item">
          <i className="fas fa-th-list"></i>
          <span>Category</span>
        </Link>
        <Link href="/user/sidebar" className="nav-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </Link>
        <Link href="/home/cart" className="nav-item">
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
        </Link>
      </div>
    </div>
  );

  export default MobileFooter;