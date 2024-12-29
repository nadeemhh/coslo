
 import './page.css'
 import '../../component/component-css/productcard.css'
import CounterComponent from '../../component/global_component'


export default function Page() {
 

  return (
    <>
    <p className='order-details-title'>wishlist</p>

    <div className="products-container">

    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src="\images\gameee.png" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
        />
        <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button>

         {/* Location */}
 <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div>
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>

        {/* Price */}
        <div className="product-actions">

        <h4 className="price">₹ 2560/-</h4>
        <CounterComponent/>

        </div>
        {/* Actions */}
        <div className="product-actions">

          {/* <button className="contact-btn">Contact Supplier</button> */}
          <button className="Add-to-Cart">Add to Cart</button> 
           <button className="Remove-btn">Remove</button>
        </div>
      </div>
    </div>

    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src="\images\gameee.png" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
        />
        <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button>

         {/* Location */}
 <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div>
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>

        {/* Price */}
        <div className="product-actions">

        <h4 className="price">₹ 2560/-</h4>
        <CounterComponent/>

        </div>
        {/* Actions */}
        <div className="product-actions">

          {/* <button className="contact-btn">Contact Supplier</button> */}
          <button className="Add-to-Cart">Add to Cart</button> 
           <button className="Remove-btn">Remove</button>
        </div>
      </div>
    </div>

    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src="\images\gameee.png" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
        />
        <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button>

         {/* Location */}
 <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div>
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>

        {/* Price */}
        <div className="product-actions">

        <h4 className="price">₹ 2560/-</h4>
        <CounterComponent/>

        </div>
        {/* Actions */}
        <div className="product-actions">

          {/* <button className="contact-btn">Contact Supplier</button> */}
          <button className="Add-to-Cart">Add to Cart</button> 
           <button className="Remove-btn">Remove</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src="\images\gameee.png" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
        />
        <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button>

         {/* Location */}
 <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div>
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>

        {/* Price */}
        <div className="product-actions">

        <h4 className="price">₹ 2560/-</h4>
        <CounterComponent/>

        </div>
        {/* Actions */}
        <div className="product-actions">

          {/* <button className="contact-btn">Contact Supplier</button> */}
          <button className="Add-to-Cart">Add to Cart</button> 
           <button className="Remove-btn">Remove</button>
        </div>
      </div>
    </div>
</div>
  </>
  )
}
