'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState, useEffect } from "react";
import extractDate from '../../../component/extdate.js'

export default function Page() {

  const [data, setdata] = useState({});
  const [showdata, setshowdata] = useState(false);
  const [subscriptionHistory, setsubscriptionHistory] = useState([]);


  const handledata = () => {

    document.querySelector('.loaderoverlay').style.display = 'flex';

    const token = localStorage.getItem('admintoken');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id); // Outputs: 678b2610e07656f4cfb728ff

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
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
        setdata(data)
        setshowdata(true)
        getsubscriptionHistory(data._id)
        // Successfully logged in
        // window.location.href = '/Employee/Onboarding';

      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      });
  };


  const getsubscriptionHistory = (id) => {

    const token = localStorage.getItem('admintoken');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/history/admin/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
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
        setsubscriptionHistory(data.subscriptionHistory)
        document.querySelector('.loaderoverlay').style.display = 'none';
        // Successfully logged in
        // window.location.href = '/Employee/Onboarding';

      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      });
  };




  useEffect(() => {
    handledata();

  }, []);


  const handlesellerdata = (token) => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
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
        console.log('=>', data)

        function setCookie(name, value, days) {
          let expires = new Date();
          expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
          document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        }


        setCookie("token", token, 1);

        localStorage.setItem('sellerdata', JSON.stringify(data));
        localStorage.setItem('token', token)
        localStorage.setItem('issuperadmin', 'true')
        window.location.href = '/supplier/dashboard';


      })
      .catch((err) => {
        console.log(err)
      });
  };


  function getsellertoken() {

    const token = localStorage.getItem('admintoken');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-seller-token?phone=${data.phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
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

        handlesellerdata(data.token)


      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      });

  }





  return (
    <div>
      {showdata && <>

        <div className="header">
          <button className="back-button">
            <Goback />
          </button>
          <h2>Manufacturer/Supplier</h2>

        </div>

        <div className='details877'>
          <div className="card-details-container">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', textAlign: 'left', marginBottom: '10px' }}>
              <div>
                <img
                  src="/images/coslouser.png"
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div>
                <p style={{ fontSize: '20px', color: '#097CE1' }}>{data.name}</p>
                {/* <p>432 Orders</p> */}
              </div>
            </div>
            <div className="card-details">
              <p className="user-email">Name : {data.name || 'N/A'}</p>
              <p className="user-email">Email : {data.email || 'N/A'}</p>
              <p className="user-phone">Phone : {data.phone || 'N/A'}</p>
              <p className="user-company">Company : {data.businessName || 'N/A'}</p>
              <p className="user-company">Business Type : {data.businessType || 'N/A'}</p>
              <p className="user-company">Delivery Type : {data.deliveryType || 'N/A'}</p>
              <p className="user-company">Subscription Type : {data?.subscription?.plan || 'N/A'}</p>
              <p className="user-company">account Holder Name : {data.bankDetails?.accountHolderName || 'N/A'}</p>
              <p className="user-company">account Number : {data.bankDetails?.accountNumber || 'N/A'}</p>
              <p className="user-company">bank Name : {data.bankDetails?.bankName || 'N/A'}</p>
              <p className="user-company">ifsc Code : {data.bankDetails?.ifscCode || 'N/A'}</p>


              {/* address */}

              <p className="user-company">address: {data.address
                ?.addressLine || 'N/A'}</p>
              <p className="user-company">city : {data.address
                ?.city || 'N/A'}</p>
              <p className="user-company">pincode : {data.address
                ?.pincode || 'N/A'}</p>
              <p className="user-company">state : {data.address
                ?.state || 'N/A'}</p>

              {/* <p className="user-company">Subscription Status : Active</p> */}
              <p className="user-company">pan Number : {data.panNumber || 'N/A'}</p>
              <p className="user-company">GST Number : {data.gstNumber || 'N/A'}</p>
              <p className="user-company">GST Certificate File : <a href={data.gstCertificateFile || 'N/A'} style={{ color: 'blue' }} target='_blank'>check file</a></p>
            </div>

          </div>


          {data.isVerified && <button className="btnn visit-btn" onClick={() => { getsellertoken() }}>
            Visit Seller <i className="fas fa-arrow-right"></i>
          </button>}

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
          {/* <div className="dropdowns">
          <div className="dropdown status-buttons">
            <p>Subscription Status : active</p>
            <select>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="dropdown status-buttons">
            <p>Subscription Type : {data.subscriptionPlan}</p>
            <select value={data.subscriptionPlan || "YEARLY"} onChange={(e) => setdata({ ...data, subscriptionPlan: e.target.value })}>
    <option value="MONTHLY">Monthly</option>
    <option value="YEARLY">Yearly</option>
    <option value="FREE">Free</option>
  </select>
          </div>
        </div> */}

          {/* <button className="btnn payment-btn">
            Add Payment <i className="fas fa-plus"></i>
          </button> */}
        </div>


        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>##</th>
                <th>Plan</th>
                <th>Date</th>
                {/* <th>Email</th> */}
                <th>Payment Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionHistory.map((subscriptionHistoryin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subscriptionHistoryin.plan}</td>
                  <td>{extractDate(subscriptionHistoryin.paymentDate)}</td>
                  {/* <td>{subscriptionHistoryin.sellerEmail}</td> */}
                  <td>{subscriptionHistoryin.paymentMethod}</td>
                  <td>{subscriptionHistoryin.amount}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}
    </div>

  );
}
