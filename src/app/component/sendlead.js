export default function sendlead(userdata,tagid,qty) {

    
      const userData = {
        name:userdata.name,
        message:userdata.message,
        tagId:tagid,
        phone:userdata.phone,
        quantity:qty
      };
    
console.log('send lead',userData)

      document.querySelector('.loaderoverlay').style.display='flex';
    
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
              
              alert('Your product enquiry has been submitted.')
              document.querySelector('.loaderoverlay').style.display='none';
              
         
        })
        .catch((err) => {
        
          alert(err.message);
          document.querySelector('.loaderoverlay').style.display='none';
        });
    };