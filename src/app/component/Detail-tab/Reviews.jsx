'use client';
import { useState ,useEffect} from "react";

function Reviews({pid}) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
     const [data, setdata] = useState(null);
    const [reviewdata, setreviewdata] = useState([]);
    console.log(rating,pid)

    const handledata = (e) => {
        e.preventDefault();
      
        let review=document.querySelector('#comment').value;
       
      if(!rating||!review){
        alert('fill all details')
        return;
      }
      
      document.querySelector('.loaderoverlay').style.display='flex';
      
      
        const userData = {
            rating,
            review,
          productId:pid
        };
      
      
        const token = localStorage.getItem('buyertoken');
      
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
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
                // Save token to localStorage
                document.querySelector('#comment').value='';
                document.querySelector('.username').value='';
                setRating(0)
                document.querySelector('.loaderoverlay').style.display='none';
                console.log(data)
                alert('review submited')
                getreview(pid)
           
          })
          .catch((err) => {
            document.querySelector('#comment').value='';
            document.querySelector('.username').value='';
            setRating(0)
            document.querySelector('.loaderoverlay').style.display='none';
            if(err.message !== "No token provided"){
                alert(err.message);
              }else{
                alert('Log in, then purchase this product to add a review.');
              }
           
          });
      };



    function getreview(productId) {

        
            document.querySelector('.loaderoverlay').style.display = 'flex';
    
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/${productId}`)
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
              console.log(data.data)
              setreviewdata(data.data)
              getdata(productId) 
              })
              .catch((err) => {
                document.querySelector('.loaderoverlay').style.display = 'none';
                console.log(err)
               
               
              });
        
          
        }

        function getdata(productId) {

    
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/stats/${productId}`)
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
              console.log(data.data)
              setdata(data.data)
              document.querySelector('.loaderoverlay').style.display = 'none';
              })
              .catch((err) => {
                document.querySelector('.loaderoverlay').style.display = 'none';
                console.log(err)
               
               
              });
        
          
        }



useEffect(() => {

  getreview(pid)
}, []);


function extractDate(isoString) {
    if (!isoString) return null;
    
    try {
        return isoString.split("T")[0]; // Extracts the date portion before 'T'
    } catch (error) {
        console.error("Invalid ISO string format", error);
        return null;
    }
}


    return (
        <div className="reviews-container">
            <div className="reviews-section">
                { data && <h3 className="title">Reviews ({data.totalReviews})</h3>}
                <div className="overall-rating">
                    <span>Overall Rating</span>
                  { data &&  <div className="stars">
                        {"⭐".repeat(Math.floor(data.averageRating))} <span className="rating-number">{data.averageRating}</span>
                    </div>}
                </div>
                {reviewdata.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            <span className="user">{review.userId.name}</span>
                            <div className="stars">
                                {"⭐".repeat(review.rating)}
                                <span>{review.rating}</span>
                            </div>
                        </div>
                        <div className="review-body">
                            <p className="date">{extractDate(review.createdAt)}</p>
                            <p style={{color:'black',textAlign:'left',fontSize:'18px'}}>{review.review}</p>
                        </div>
                        
                    </div>
                ))}
            </div>

            <div className="rating-section">
                <h3 className="title">Rate Us</h3>
                <div className="feedback-stars565">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star feedback-star565 ${
              (hover || rating) >= star ? 'filled565' : ''
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          ></i>
        ))}
      </div>
                <form className="rating-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" id="name" className="form-input username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment" className="form-label">Your Review</label>
                        <textarea
                            id="comment"
                            rows="4"
                            className="form-input"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button" onClick={handledata}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Reviews;
