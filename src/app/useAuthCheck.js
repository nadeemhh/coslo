'use client'
import { useEffect } from 'react';

 const useAuthCheck = (url) => {

  useEffect(() => {

    function getCookie(name) {
      let cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
          let [key, value] = cookie.split("=");
          if (key === name) return value;
      }
      return null;
  }
  
     
  if (!getCookie("token")) {
  // Redirect to the login page
  localStorage.removeItem('token')
  window.location.href = url;
}


  },[]);
};

export default useAuthCheck;



