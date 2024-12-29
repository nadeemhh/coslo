'use client'
import '../component/component-css/accountsetting.css'

function AccountSettings() {
    return (
        <div className="account-settings">
        <h2>Account Settings</h2>
        <div className="profile-section">
          <img
            src="\images\user2.png"
            alt="Profile"
            className="myprofile-image"
          />
          <div className="form-container" style={{backgroundColor:'white'}}>
            <div className="row">
              <div className="input-group">
                <label>Enter Name</label>
                <input type="text" placeholder="Faiz Iqbal" />
              </div>
              <div className="input-group">
                <label>Enter Email</label>
                <input type="email" placeholder="faiz@gmail.com" />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 9876543210" />
              </div>
              <div className="input-group">
                <label>PIN Code</label>
                <input type="text" placeholder="000000" />
              </div>
            </div>
            <button className="save-button">
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>

         
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
        
        </div>
  
        
      </div>
    );
}

export default AccountSettings;