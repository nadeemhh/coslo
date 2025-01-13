
import "../CreateAccount.css";

function ForgotPassword() {
    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img2.png"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Forgot Password</h1>
                    <p>Streamline your business operations with our marketplace</p>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" />
                    </div>
                    <div className='form-tab'>
                        <label>Additional Information</label>
                        <input type="text" placeholder="" className="" />
                    </div>
                    <button className="form-tab">Request Password Change ➜</button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword