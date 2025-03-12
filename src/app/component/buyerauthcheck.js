'use client'
import { useEffect } from 'react';

 const BuyerAuthCheck = (setuser) => {

  useEffect(() => {

    function getCookie(name) {
        let cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }
    
       
    if (!getCookie('buyertoken')) {
    // Redirect to the login page
    localStorage.removeItem('buyertoken')
    localStorage.removeItem('buyer')
  }else{
    setuser(JSON.parse(localStorage.getItem('buyer')))
  }

  },[]);
};

export default BuyerAuthCheck;



