
import "../../CreateAccount.css";

function Login() {
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
                    <h1 className="">Admin Login</h1>
                    <p> I want add Sell directly to Buyers With ZERO Commission</p>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" />
                    </div>
                    <div className='form-tab'>
                        <label>Enter Password</label>
                        <input type="password" placeholder="********" className="" />
                    </div>
                    <button className="form-tab">Admin Login ➜</button>
                </div>
            </div>
        </div>
    );
}

export default Login