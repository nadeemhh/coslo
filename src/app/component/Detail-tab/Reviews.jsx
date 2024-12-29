'use client';
import { useState } from "react";

function Reviews() {
    const [rating, setRating] = useState(3);
    const reviewData = [
        {
            user: "User 1",
            date: "3rd January 2020",
            rating: 5,
            comment:
                "I recently purchased the GoldenGrain Bulk Basmati Rice for my restaurant, and I am extremely impressed with the quality. The grains are long, fragrant, and cook perfectly every time, which is essential for our dishes.",
            likes: 5,
            dislikes: 1,
        },
        {
            user: "User 2",
            date: "5th February 2021",
            rating: 4,
            comment:
                "The rice quality is good but the packaging could be improved. Overall, a great purchase for my catering business.",
            likes: 3,
            dislikes: 2,
        },
    ];

    return (
        <div className="reviews-container">
            <div className="reviews-section">
                <h3 className="title">Reviews (18)</h3>
                <div className="overall-rating">
                    <span>Overall Rating</span>
                    <div className="stars">
                        {"⭐".repeat(5)} <span className="rating-number">5.0</span>
                    </div>
                </div>
                {reviewData.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            <span className="user">{review.user}</span>
                            <div className="stars">
                                {"⭐".repeat(review.rating)}
                                <span>{review.rating}</span>
                            </div>
                        </div>
                        <div className="review-body">
                            <p className="date">{review.date}</p>
                            <p>{review.comment}</p>
                        </div>
                        <div className="review-actions">
                           
                            <button className="action-button">👍 {review.likes}</button>
                            <button className="action-button">👎 {review.dislikes}</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rating-section">
                <h3 className="title">Rate Us</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= rating ? "active-star" : ""}
                            onClick={() => setRating(star)}
                        >
                            ⭐
                        </span>
                    ))}
                </div>
                <form className="rating-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" id="name" className="form-input" required />
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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Reviews;
