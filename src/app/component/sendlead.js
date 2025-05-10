export default function sendlead(userdata,pid,toggleModal=false) {

    document.querySelector('.loaderoverlay').style.display='flex';
    
    
      const userData = {
        name:userdata.name,
        message:userdata.message,
        productId:pid,
        phone:userdata.phone,
      };
    
console.log('send lead',userData)


    
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/leadQuotation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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
              
              alert(data.message)
              document.querySelector('.loaderoverlay').style.display='none';
              
              if(toggleModal){
                toggleModal()
              }
           
         
        })
        .catch((err) => {
        
          alert(err.message);
          document.querySelector('.loaderoverlay').style.display='none';
        });
    };