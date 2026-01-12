import { useState } from 'react';

const PropertyPlansTable = ({ user, setUser }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');


  const planData = {
    monthly: {
      price: '3000',
      propertyListing: true,
      leads: '1 TO 5',
      refund: false,
      perDayCost: '100'
    },
    yearly: {
      price: '30000',
      propertyListing: true,
      leads: '10 TO 15',
      refund: true,
      perDayCost: '82'
    },
    free: {
      price: '0',
      propertyListing: true,
      leads: '0',
      refund: false,
      perDayCost: '0'
    }
  };

  const currentPlan = planData[selectedPlan];

  return (
    <div className="container876" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container876 {
          max-width: 900px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          padding: 0 15px;
        }

        .tabs876 {
         display: flex;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
        }

        .tab876 {
          padding: 5px 10px !important;
          background: #f0f0f0 !important;
          border: none !important;
          cursor: pointer;
          font-size: 16px !important;
          border-radius: 5px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          color:#4b4a4a !important;
        }

        .tab876:hover {
          background: #e0e0e0;
        }

        .tab876.active876 {
          background: linear-gradient(135deg, #FF8C00, #FFA500) !important;
          color: white !important;
        }

        .table876 {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          border-radius: 8px;
        }

        .header876 {
          background: linear-gradient(135deg, #FF8C00, #FFA500);
          color: white;
          text-align: center;
        }

        .header876 th {
          padding: 20px;
          font-size: 18px;
          font-weight: bold;
        }

        .header876-title876 {
          text-align: left;
          font-size: 24px;
          text-transform: uppercase;
        }

        .header876-price876 {
          font-size: 32px;
        }

        .row876 {
          border-bottom: 1px solid #e0e0e0;
        }

        .row876:nth-child(even) {
          background-color: #f9f9f9;
        }

        .cell876 {
          padding: 18px 20px;
        }

        .feature876 {
          background: #003d6b;
          color: white;
          font-size: 16px;
          text-align: left;
        }

        .value876 {
          text-align: center;
          font-size: 18px;
          color: #003d6b;
        }

        .icon876 {
          color: #00c853;
          font-size: 24px;
        }

        .icon876.cross876 {
          color: #ff1744;
        }

        @media (max-width: 768px) {
          .container876 {
            padding: 0 10px;
          }

          .tabs876 {
            gap: 8px;
          }

            .tab876 {
          padding: 5px 10px !important;
          background: #f0f0f0;
          border: none;
          cursor: pointer;
          font-size: 12px !important;
          font-weight: bold;
          border-radius: 5px;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

          .header876 th {
            padding: 15px 10px;
            font-size: 14px;
          }

          .header876-title876 {
            font-size: 18px;
          }

          .header876-price876 {
            font-size: 24px;
          }

          .cell876 {
            padding: 12px 10px;
            font-size: 14px;
          }

          .feature876 {
            font-size: 13px;
          }

          .value876 {
            font-size: 16px;
          }

          .icon876 {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .tab876 {
            font-size: 12px;
            padding: 8px 15px;
          }

          .header876-title876 {
            font-size: 16px;
          }

          .header876-price876 {
            font-size: 20px;
          }

          .cell876 {
            padding: 10px 8px;
            font-size: 12px;
          }

          .feature876 {
            font-size: 12px;
          }

          .value876 {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="tabs876">
        <button
          className={`tab876 ${selectedPlan === 'monthly' ? 'active876' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            setSelectedPlan('monthly')
            setUser({ ...user, purchasePlan: 'MONTHLY' })
          }}
        >
          Monthly Plan
        </button>
        <button
          className={`tab876 ${selectedPlan === 'yearly' ? 'active876' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            setSelectedPlan('yearly')
            setUser({ ...user, purchasePlan: 'YEARLY' })
          }}
        >
          Yearly Plan
        </button>
        {/* <button 
          className={`tab876 ${selectedPlan === 'free' ? 'active876' : ''}`}
          onClick={(e) => {
             e.preventDefault()
            setSelectedPlan('free')}}
        >
          Free Plan
        </button> */}
      </div>

      <table className="table876">
        <thead className="header876">
          <tr>
            <th className="header876-title876">FEATURES PRICE</th>
            <th className="header876-price876" style={{ color: '#003d6b' }}>₹ {currentPlan.price}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="row876">
            <td className="cell876 feature876">Leads Per Month</td>
            <td className="cell876 value876">{selectedPlan !== 'free' ? currentPlan.leads : <i className="fa fa-times icon876 cross876"></i>}</td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Registration & Validation</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Integrated Trusted Payment Gateway</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Unlimited Property Listing</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Chat With Buyers In Whatsapp</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          {/* <tr className="row876">
            <td className="cell876 feature876">Recommended Seller Badge Display</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr> */}
          <tr className="row876">
            <td className="cell876 feature876">Legal Certificate Display</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Dedicated Customer Support Team</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Properties & Amenities Video Upload</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Social Media Integration</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          <tr className="row876">
            <td className="cell876 feature876">Integrated Google Map To <br /> Locate The Property & See <br /> The Nearby Places For <br /> The Buyers</td>
            <td className="cell876 value876">
              <i className="fa fa-check icon876"></i>
            </td>
          </tr>
          {selectedPlan !== 'free' && <tr className="row876">
            <td className="cell876 feature876">100% Refund If The Zero Leads/sales</td>
            <td className="cell876 value876">
              {currentPlan.refund ? (
                <i className="fa fa-check icon876"></i>
              ) : (
                <i className="fa fa-times icon876 cross876"></i>
              )}
            </td>
          </tr>}
          {selectedPlan !== 'free' && <tr className="row876">
            <td className="cell876 feature876">Per Day Cost</td>
            <td className="cell876 value876">{currentPlan.perDayCost}</td>
          </tr>}
        </tbody>
      </table>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

export default PropertyPlansTable;