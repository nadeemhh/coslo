'use client'
import { useState } from 'react';
import Reviews from "./Reviews";
import '../component-css/tab.css'
const Detail = () => {
    const [activeTab, setActiveTab] = useState("description");

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return <div>
                    <p>
                        Ecommerce, also known as electronic commerce or internet commerce,
                        refers to the buying and selling of goods or services using the
                        internet, and the transfer of money and data to execute these
                        transactions. Ecommerce, also known as electronic commerce or
                        internet commerce, refers to the buying and selling of goods or
                        services using the internet, and the transfer of money and data to
                        execute these transactions.
                    </p>
                    <p>
                        Ecommerce, also known as electronic commerce or internet commerce,
                        refers to the buying and selling of goods or services using the
                        internet, and the transfer of money and data to execute these
                        transactions. Ecommerce, also known as electronic commerce or
                        internet commerce, refers to the buying and selling of goods or
                        services using the internet.
                    </p>
                </div>;
            case "technicalDetails":
                return (
                    <div className="technical-details">
                        <p><strong>Product Name:</strong> EliteCotton 100% Organic T-Shirts</p>
                        <p><strong>Manufacturer:</strong> ElectroMart Direct</p>
                        <p><strong>Location:</strong> Varanasi</p>
                        <p><strong>Net Weight:</strong> 10 kg</p>
                        <p><strong>Delivery Time:</strong> 8-10 Days</p>
                        <p><strong>GST No.:</strong> 6987694843</p>
                    </div>
                );
            case "shippingPayments":
                return <div>Shipping & Payments content goes here.</div>;
            case "reviews":
                return (
                    <><Reviews /></>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="tabs">
                <button
                    className={activeTab === "description" ? "active" : ""}
                    onClick={() => setActiveTab("description")}
                >
                    Description
                </button>
                <button
                    className={activeTab === "technicalDetails" ? "active" : ""}
                    onClick={() => setActiveTab("technicalDetails")}
                >
                    Technical Details
                </button>
                <button
                    className={activeTab === "shippingPayments" ? "active" : ""}
                    onClick={() => setActiveTab("shippingPayments")}
                >
                    Shipping & Payments
                </button>
                <button
                    className={activeTab === "reviews" ? "active" : ""}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews
                </button>
            </div>
            <div className="content">{renderContent()}</div>
        </div>
    );
}

export default Detail