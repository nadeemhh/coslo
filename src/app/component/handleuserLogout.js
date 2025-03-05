const handleLogout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('token');
    localStorage.removeItem('buyer')
    window.location.href = '/home/login';
  };

  export default handleLogout;