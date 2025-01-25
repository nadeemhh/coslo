'use client'
import { useParams } from 'next/navigation';
import { useState ,useEffect} from 'react';
import "../../../CreateAccount.css";

function ResetPassword() {
    const params = useParams();
    const token = params.token;
     const buyerid = params.buyerid;
    console.log(token,'sellerid',buyerid)

      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/verify-account/${buyerid}/${token}`, {
          method: 'GET',
          
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
                throw new Error(errorData.message || 'Failed.');
              });
            }
          })
          .then((data) => {
             console.log(data)
             window.location='/home/login';
            
          })
          .catch((err) => {
           
          });
        }, []);

  console.log(token)


 

    return (
        <div className='main' >
            
        </div>
    );
}

export default ResetPassword