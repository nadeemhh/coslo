export default  function enableshiprocket(sellerId,url){
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/add-pickup/${sellerId}`, {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
            console.log(data)
          
           window.location.href = url;
       
      })
      .catch((err) => {
       alert(err)
        console.log(err)
      });
  };
