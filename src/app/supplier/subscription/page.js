'use client'
import './page.css'
import Link from 'next/link';
import PlansTable from '../../component/planstables.js';
import PropertyPlansTable from '../../component/PropertyPlansTable.js';
import { useState, useEffect } from "react";


export default function page() {

  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [data, setdata] = useState({});
  const [subscriptionHistory, setsubscriptionHistory] = useState([]);
  const [showdata, setshowdata] = useState(null);
  const [cplan, setcplan] = useState('');
  const [sellertype, setsellertype] = useState('');

  console.log(sellertype)

  const handledata = () => {

    document.querySelector('.loaderoverlay').style.display = 'flex';

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/current`, {
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
            throw new Error(errorData.error || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
        console.log(data)
        if (data.status === 'PAYMENT_PENDING') {
          setshowdata(false)
          document.querySelector('.loaderoverlay').style.display = 'none';
        } else {
          setdata(data)
          setcplan(data.plan);
          setshowdata(true)
          getsubscriptionHistory()
        }

      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        window.location.href = '/#cosloplans';
      });
  };



  const getsubscriptionHistory = () => {


    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/history/seller/`, {
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
    setsellertype(JSON.parse(localStorage.getItem('sellerdata'))?.sellerType)
  }, []);


  const toggleconfirmation = () => {

    setconfirmationOpen(!confirmationOpen);
  };


  const handleChange = (e) => {
    console.log(e.target.value)
    setcplan(e.target.value);
    handlebuy(e.target.value)
  };


  function extractDate(isoString) {
    if (!isoString) return null;

    try {
      return isoString.split("T")[0]; // Extracts the date portion before 'T'
    } catch (error) {
      console.error("Invalid ISO string format", error);
      return null;
    }
  }

  function PayCurrentPlan(plan) {
    console.log(plan)
    handlebuy(plan)
  }


  async function handlebuy(plan) {
    console.log(plan)

    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: plan })
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.error)
        return;
      }

      // Assuming the response returns a JSON with the payment URL
      const data = await response.json();

      const paymentUrl = data.paymentUrl;
      if (paymentUrl) {
        // Redirect to the payment URL
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error('Error starting subscription:', error);
    }

  }

  return (
    <div className="orders-container">
      {showdata !== null && showdata === true ? <>
        <div className="header">

          <h2 style={{ margin: '30px 0px' }}>Subscription</h2>

        </div>


        <div className="subscription-container">
          <div className="subscription-box slideupanimate">
            <div className={data.validityLeft ? "plan-details" : "plan-detailsex"}>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="plan-title">{data.plan}</div>

                <div style={{ textAlign: 'right' }}>
                  <div className={data.validityLeft ? "plan-price" : "plan-priceex"}>₹ {data.pricing.total}</div>
                  {data.plan !== 'TRIAL' && data.plan !== 'FREE' && <div className="plan-description">18% GST included.</div>}
                  {/* <div className="plan-description"> ₹{data.pricing.gst/2} CGST + ₹{data.pricing.gst/2} SGST</div> */}
                </div>

              </div>

              {data.plan === 'FREE' && <div style={{ lineHeight: "1.6" }}>
                <p style={{ fontSize: "16px", fontWeight: "600", margin: "10px 0px" }}>
                  To get customer leads, choose a monthly or yearly subscription.
                </p>

                <ul style={{ paddingLeft: "20px", fontSize: "15px" }}>
                  <li>
                    <strong>Monthly subscription:</strong> {sellertype === 'Property' ? '1 to 5' : '15 to 20'} leads per month
                  </li>
                  <li>
                    <strong>Yearly subscription:</strong> {sellertype === 'Property' ? '10 to 15' : '25 to 30'} leads per month
                  </li>
                </ul>
              </div>}

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="details">
                  {data.plan !== 'FREE' && <span className="general-subscription">General Subscription </span>}
                  {data.plan !== 'FREE' && (data.validityLeft ? <span className="validity"> Validity : {data.validityLeft} Days Left</span> : <span className="validityex"> Validity : <strong>Expired</strong></span>)}
                </div>
                {data.plan !== 'TRIAL' && data.plan !== 'FREE' && <button className={data.validityLeft ? "pay-button" : "pay-buttonex"} onClick={() => { PayCurrentPlan(data.plan) }} style={{ marginTop: '20px' }}> Pay Current Plan <i className="fas fa-arrow-right"></i></button>}
              </div>
            </div>
            {/* <button className="cancel-button"  onClick={toggleconfirmation}>Cancel Subscription</button> */}
          </div>

          <div className="change-plan-section">
            <label className="change-plan-label" htmlFor="plan-select">
              Change Plan:
            </label>
            <select id="plan-select" className="plan-select" value="" onChange={handleChange}>
              <option value="">Select Plan</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          {data.plan !== 'FREE' && <div className="current-plan">
            <span className="current-plan-label">Current Plan :</span>{" "}
            <span className="current-plan-dates">{extractDate(data.currentPeriod.startDate)} <span style={{ color: 'black' }}> &nbsp; / &nbsp; </span> {extractDate(data.currentPeriod.endDate)}</span>
          </div>}

          {data?.nextPeriod && data?.nextPeriod?.status !== "PAYMENT_PENDING" && <div className="next-plan">
            <span className="current-plan-label">Next Plan Starts From :</span>{" "}
            <span className="current-plan-dates">{extractDate(data?.nextPeriod?.startDate)} <span style={{ color: 'black' }}> &nbsp; / &nbsp; </span> {extractDate(data?.nextPeriod?.endDate)}</span>
          </div>
          }

        </div>

        <p style={{ fontSize: '22px', textAlign: 'left', margin: '30px 0px' }}>Payment History</p>

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>##</th>
                <th>Plan</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionHistory.map((subscriptionHistoryin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subscriptionHistoryin.plan || 'N/A'}</td>
                  <td>{extractDate(subscriptionHistoryin.paymentDate) || 'N/A'}</td>
                  <td>{subscriptionHistoryin.paymentInfo.status || 'N/A'}</td>
                  <td>{subscriptionHistoryin.paymentInfo.paymentMethod || 'N/A'}</td>
                  <td>{subscriptionHistoryin.paymentInfo.amount || 'N/A'}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="pagination">
        <span className='pre'> <i className="fas fa-arrow-left"></i>Previous</span>
        <button className='activepage'>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        
        <span className='next'>Next <i className="fas fa-arrow-right"></i></span>
      </div> */}

        {confirmationOpen && (
          <div className="modal-overlay">

            <div className="confirmation-box">
              <div className="icon">
                {/* Replace the src below with the actual path to your image */}
                <img
                  src="\icons\confar.png"
                  alt="Icon"
                  className="icon-image"
                />
              </div>
              <p className="message">Are you sure ?</p>
              <div className="button-group">
                <button className="button no-button" onClick={toggleconfirmation}>No</button>
                <button className="button yes-button">Yes</button>
              </div>
            </div>
          </div>
        )}

        <div>

          <div style={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <h1 style={{ fontSize: '2rem' }}>Subscription Plans</h1>

          </div>

          {sellertype !== 'Property' ? <PlansTable hidetry={true} /> : <PropertyPlansTable />}

        </div>

      </> : <div>

        <div style={{ marginBottom: '3rem', marginTop: '3rem' }}>
          <h1 style={{ fontSize: '2rem' }}>Subscription Plans</h1>

        </div>
        {sellertype !== 'Property' ? <PlansTable hidetry={true} /> : <PropertyPlansTable />}


      </div>}
    </div>
  );
}

