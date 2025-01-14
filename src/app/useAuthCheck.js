'use client'
import { useEffect } from 'react';

const useAuthCheck = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      // Redirect to the login page
      window.location.href = '/auth/superadminlogin';
    }
  },[]);
};

export default useAuthCheck;
