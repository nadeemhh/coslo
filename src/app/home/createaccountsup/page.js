
import "../../supplier/CreateAccount.css";


function Page() {
    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img1.png"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">We will get back to you soon!</h1>
                    <p> I want add Sell directly to Buyers With ZERO Commission</p>
                    <div className="form-tab">
                        <label>Enter Name</label>
                        <input type="text" placeholder="Enter Your Name" className="" />
                    </div>
                    <div className="form-tab">
                        <label>Enter Phone No</label>
                        <input type="text" placeholder="+91" className="" />
                    </div>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" />
                    </div>
                    <div className='form-tab'>
                        <label>Enter Company Name *</label>
                        <input type="text" placeholder="" className="" />
                    </div>
                  
                   
                    <button className="form-tab">Request Registration ➜</button>
                </div>
            </div>
        </div>
    );
}

export default Page;