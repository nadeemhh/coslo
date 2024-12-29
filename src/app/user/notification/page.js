import './page.css'
export default function Page() {
  return (
    <>

<p className='Notifications'>Notifications</p>

    <div className="notification-card">
    <div className="icon">
      <i className="fas fa-circle"></i>
    </div>
    <div className="text-content">
      <p className="title">Order Successful</p>
      <p className="message">Your order has been received. Wait for the order to get approved, thanks.</p>
    </div>
    <div className="close-icon">
      <i className="fas fa-times"></i>
    </div>
  </div>

<div className="notification-card">
<div className="icon">
  <i className="fas fa-circle"></i>
</div>
<div className="text-content">
  <p className="title">Order Successful</p>
  <p className="message">Your order has been received. Wait for the order to get approved, thanks.</p>
</div>
<div className="close-icon">
  <i className="fas fa-times"></i>
</div>
</div>

<div className="notification-card">
<div className="icon-gray">
  <i className="fas fa-circle"></i>
</div>
<div className="text-content">
  <p className="title">Order Successful</p>
  <p className="message">Your order has been received. Wait for the order to get approved, thanks.</p>
</div>
<div className="close-icon">
  <i className="fas fa-times"></i>
</div>
</div>

<div className="notification-card">
<div className="icon-gray">
  <i className="fas fa-circle"></i>
</div>
<div className="text-content">
  <p className="title">Order Successful</p>
  <p className="message">Your order has been received. Wait for the order to get approved, thanks.</p>
</div>
<div className="close-icon">
  <i className="fas fa-times"></i>
</div>
</div>

</>
  )
}
