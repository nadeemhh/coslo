'use client'
import  { useState,useEffect } from "react";



const Policies = () => {

    const [policydata,setpolicydata] = useState(null);


    
    const handlepolicydata = () => {
      
   
     document.querySelector('.loaderoverlay').style.display='flex';
 
  
 
     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/platform`, {
       method: 'GET',
      
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
             setpolicydata(data)
            document.querySelector('.loaderoverlay').style.display='none';

       })
       .catch((err) => {
         document.querySelector('.loaderoverlay').style.display='none';
         console.log(err)
       });
   };
 
   useEffect(() => {
     handlepolicydata();
   },[]);

   
  return (
    <div className="policies-container">
        {policydata && <>
      <h1>Our Policies</h1>
      
      <section className="policy-section" id='TermsofService'>
      <h3>1. Terms & Conditions</h3>
            
            <div dangerouslySetInnerHTML={{ __html: policydata.termsOfService }}></div>
      </section>
      
      <section className="policy-section" id='PrivacyPolicy'>
      <h3>2. Privacy Policy</h3>
            <p>
            {policydata.privacyPolicy}
            </p>
      </section>
      
      <section className="policy-section" id='ReturnPolicy'>
      <h3>3. Return Policy</h3>
           
            <div dangerouslySetInnerHTML={{ __html: policydata.returnPolicy }}></div>
          
      </section>
      </>}
    </div>
  );
};

export default Policies;

// CSS Styling (can be added in a separate CSS file or within a styled component)
const styles = `
  .policies-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  .policy-section {
    background: #f9f9f9;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1, h2 {
    color: #333;
  }
`;

// To use the styles, you can include a CSS file or use styled-components
