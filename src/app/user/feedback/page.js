'use client'

import './page.css'
import { useState } from 'react';



export default function Page() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

console.log(rating)

const handledata = (e) => {
  e.preventDefault();

  let feedback=document.querySelector('.feedback-textarea565').value;

if(!rating||!feedback){
  alert('fill all details')
  return;
}

document.querySelector('.loaderoverlay').style.display='flex';


  const userData = {
      rating,
    feedback,
  };


  const token = localStorage.getItem('buyertoken');

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/apprating`, {
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
          document.querySelector('.feedback-textarea565').value='';
          setRating(0)
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(data)
          alert('feedback submited')
     
    })
    .catch((err) => {
      document.querySelector('.feedback-textarea565').value='';
      setRating(0)
      document.querySelector('.loaderoverlay').style.display='none';
      alert(err.message);
    });
};

  return (
    <>

<h2 className='Feedbacktitle'>Feedback</h2>

<div className="feedback-container565">
      <div className="feedback-header565">
        <div className="feedback-icon565">
        <img src="\icons\feedi.png" alt="" />
        </div>
        <h2>How was your experience using Coslo</h2>
        <p>We value your feedback, please rate your overall experience</p>
      </div>
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
      <textarea
        className="feedback-textarea565"
        placeholder="Kindly write detailed review here"
      ></textarea>
      <button className="feedback-submit565" onClick={handledata}>Submit</button>
    </div>

</>
  )
}


