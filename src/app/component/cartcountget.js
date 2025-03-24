'use client'

export default function cartcountget() {

  const token = localStorage.getItem('buyertoken');
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/count`, {
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
           document.querySelector('.btn_badge77').textContent=data.productCount;
           document.querySelector('.btn_badge11').textContent=data.productCount;

      })
      .catch((err) => {
        console.log(err)
      });
}