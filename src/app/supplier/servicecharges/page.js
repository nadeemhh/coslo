"use client";
import './page.css';

const page = () => {
    return (
        <div className="service-charges-container">
            <div className="service-charges-overlay"></div>
            <div className="service-charges-modal">
                <div className="modal-content">
                    <h2 className="modal-title">Service Charge Policy</h2>
                    <p className="modal-text">
                        Coslomart will apply a <strong>2% service charge</strong> on the total project cost for every successfully closed property deal.
                    </p>
                    <div className="modal-divider"></div>
                    <p className="modal-subtext">
                        We provide end-to-end services — from property site visits to final registration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
