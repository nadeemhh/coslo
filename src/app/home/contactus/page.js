import '../about-us/about.css'


export const metadata = {
    title: "contact us",
  description: "contact us",
   alternates: {
      canonical: `https://www.coslomart.com/home/contactus`,
    },
};


const Page = () => {

   
  return (
    <div className="container559">
    
    <h2 className="sectionTitle559">Get in Touch</h2>
    <p className="text559">Contact us to learn more about our platform, partnerships, and career opportunities:</p>
    <p className="contactInfo559">Email: vinodsimson@coslomart.com</p>
    <p className="contactInfo559">Support Email: Support@coslomart.com</p>
    <p className="contactInfo559">Help Email: Help@coslomart.com</p>
    <p className="contactInfo559">Phone: 9740976987</p>
    <p className="contactInfo559">Address: H.No 254, Millennium Valley, Hompalaghatta, Anekal, Bangalore - 562106</p>
  </div>
  );
};

export default Page;

// CSS Styling (can be added in a separate CSS file or within a styled component)
const styles = `
  .policies-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  .policy-section {
    background: #f9f9f9;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1, h2 {
    color: #333;
  }
`;

// To use the styles, you can include a CSS file or use styled-components
