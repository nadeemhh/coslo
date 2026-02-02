'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './page.css'

function Page() {


  useEffect(() => {
    localStorage.removeItem("token")
  }, []);



  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="failure-box2 slideupanimate">
        <p className="message2">Your payment has failed.</p>
        <a href="/auth/sup-manu/login">
          <button className="retry-button2">Go To Your Account</button>
        </a>
      </div>
    </div>
  );
}

export default Page