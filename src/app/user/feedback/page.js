'use client'

import './page.css'
import { useState } from 'react';


export default function Page() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
console.log(rating)
  return (
    <>

<p className='Feedback'>Feedback</p>

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
      <button className="feedback-submit565">Submit</button>
    </div>

</>
  )
}
