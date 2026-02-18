'use client'
import "../../CreateAccount.css";

import { useState, useEffect } from 'react';


function Login() {

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [timer, setTimer] = useState(600); // 600 seconds = 10 minutes
  const [canResend, setCanResend] = useState(false);


  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };


  async function handlebuy(plan, sellertoken) {
    console.log(plan)

    // Check if token exists in localStorage
    const token = sellertoken;

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
      localStorage.removeItem("token")
      window.location.href = '/auth/sup-manu/login';
    }

  }


  const handlesellerdata = () => {

    const token = localStorage.getItem('token');

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
        localStorage.setItem('sellerdata', JSON.stringify(data));

        const searchParams = new URLSearchParams(window.location.search);
        const purchasePlan = searchParams.get('purchasePlan');

        console.log(purchasePlan)

        if (purchasePlan) {

          handlebuy(purchasePlan, token)

        } else {
          if (data.sellerType === "Property") {
            window.location.href = '/supplier/Products';
          } else {
            window.location.href = '/supplier/dashboard';
          }

        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    document.querySelector('.loaderoverlay').style.display = 'flex';
    setError('');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {

            throw new Error(errorData.error || 'Failed to send OTP.');

          });
        }
      })
      .then((data) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        setStep(2);
        setTimer(600);
        setCanResend(false);
      })
      .catch((err) => {
        console.log(err)
        document.querySelector('.loaderoverlay').style.display = 'none';
        setError(err.message);
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the verification code");
      return;
    }

    document.querySelector('.loaderoverlay').style.display = 'flex';
    setError('');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/auth/login-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || 'Invalid Request. Please try again.');
          });
        }
      })
      .then((data) => {
        // Save token to localStorage


        document.querySelector('.loaderoverlay').style.display = 'none';
        localStorage.setItem('token', data.token);
        handlesellerdata()



      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        setError(err.message);
      });
  };

  const handleResendOtp = () => {
    document.querySelector('.loaderoverlay').style.display = 'flex';
    setError('');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed to resend OTP.');
          });
        }
      })
      .then((data) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        setTimer(600);
        setCanResend(false);
        setError('OTP sent successfully!');
        setTimeout(() => setError(''), 3000);
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        setError(err.message);
      });
  }


  useEffect(() => {

    if (localStorage.getItem('token')) {

      let data = JSON.parse(localStorage.getItem('sellerdata'));
      if (data) {
        if (data.sellerType === "Property") {
          window.location.href = '/supplier/Products';
        } else {
          window.location.href = '/supplier/dashboard';
        }
      }


    }

  }, []);

  return (
    <div className='main' >
      <div className="left-container">
        <img
          src="\images\img1.jpg"
          alt="Profile"
          className="profile-pic"
        />
      </div>
      <div className='right-container'>
        <div className="form">
          <h1 className="">Seller Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {step === 1 && (
            <div className="slideleftanimate">
              <div className="form-tab">
                <label>Enter Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <button className="form-tab" onClick={handleSendOtp}>Get OTP ➜</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="slideleftanimate">
              <div className="form-tab">
                <label>Enter Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className=""
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    style={{ background: 'none', border: 'none', color: '#1389F0', cursor: 'pointer', padding: 0 }}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span>Resend OTP in {formatTime(timer)}</span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <button className="form-tab" onClick={handleVerifyOtp}>Login ➜</button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <a href="/auth/sup-manu/choose" style={{ color: '#1389F0', textDecoration: 'none' }}>Don't have an account? Create an account.</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login