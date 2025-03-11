'use client'
import '../component/component-css/accountsetting.css'
import { useEffect, useState } from 'react';


function AccountSettings() {
  const [user, setuser] = useState(null);

  function getaccountdetails() {

    
    const token = localStorage.getItem('buyertoken');

        document.querySelector('.loaderoverlay').style.display = 'flex';

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
               
                throw new Error(errorData.error || 'Failed');
              });
            }
          })
          .then((data) => {
          console.log(data)
          setuser(data.data)
          document.querySelector('.loaderoverlay').style.display = 'none';
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
           
           
          });
    
      
    }


  useEffect(() => {

    getaccountdetails()

  }, []);


  
  const send = () => {
    document.querySelector('.loaderoverlay').style.display='flex';
    console.log({name:user.name,phone:user.phone,email:user.email,});
    
    
      const token = localStorage.getItem('buyertoken');
    
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: JSON.stringify({name:user.name,phone:user.phone,email:user.email,}),
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
              
         

          let buyer=JSON.parse(localStorage.getItem('buyer'));
buyer.name=user.name;
buyer.phone=user.phone;
buyer.email=user.email;

localStorage.setItem('buyer',JSON.stringify(buyer))

             location.reload()
            
        })
        .catch((err) => {
        alert(err.message)
          console.log(err)
          document.querySelector('.loaderoverlay').style.display='none';
        });
    };


    return (
        <div className="account-settings">
        <h2>Account Settings</h2>
        <div className="profile-section">
          {/* <img
            src="\images\user2.png"
            alt="Profile"
            className="myprofile-image"
          /> */}
         {user && <div className="form-container" style={{backgroundColor:'white'}}>
            <div className="row">
              <div className="input-group">
                <label>Enter Name</label>
                <input type="text" placeholder="your name"  value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })}/>
              </div>
              <div className="input-group">
                <label>Enter Email</label>
                <input type="email" placeholder="mail" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })}/>
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91" value={user.phone} onChange={(e) => setuser({ ...user, phone: e.target.value })}/>
              </div>
              
            </div>
            <button className="save-button" onClick={()=>{send()}}>
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>}

{/*          
          <div className="form-container" style={{backgroundColor:'white'}}>
            <div className="row">
              <div className="input-group">
                <label>Current Password</label>
                <input type="password" placeholder="*********" />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>New Password</label>
                <input type="password" placeholder="*********" />
              </div>
              
            </div>
            <div className="row">
            
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="*********" />
              </div>
            </div>
            <button className="change-button">
              <i className="fas fa-key"></i> Change Password
            </button>
          </div>
         */}
        </div>
  
        
      </div>
    );
}

export default AccountSettings;