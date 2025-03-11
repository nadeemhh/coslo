const handleLogout = () => {
  document.cookie = "buyertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('buyertoken');
    localStorage.removeItem('buyer')
    window.location.href = '/home/login';
  };

  export default handleLogout;