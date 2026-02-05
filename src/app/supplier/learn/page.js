"use client";
import React from 'react';
import './page.css';

const LearnPage = () => {
    return (
        <div className='learn-container'>
            <h2 style={{ marginBottom: '20px', color: '#1890ff', marginBottom: '40px' }}>Learning Center</h2>
            <div className='video-grid'>

                <div className='video-card'>
                    <h3>How to create an account and log in to Coslomart Properties</h3>
                    <div className='responsive-video'>
                        <iframe
                            src="https://www.youtube.com/embed/dp_ScPMgW5k"
                            title="How to create an account and log in to Coslomart Properties"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>

                <div className='video-card'>
                    <h3>How to list your property on Coslomart</h3>
                    <div className='responsive-video'>
                        <iframe
                            src="https://www.youtube.com/embed/YTxpw8tBSiQ"
                            title="How to list your property on Coslomart"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LearnPage;
