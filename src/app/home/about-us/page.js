

const Page = () => {

   
  return (
    <div className="policies-container">
       
      <h1>About Us</h1>
      
      <section className="policy-section" id='TermsofService'>
      <h3></h3>
            <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque quae earum dolore hic ipsum, adipisci, rem quibusdam in excepturi, ducimus id accusamus vitae nihil voluptates! Adipisci fuga saepe illo quos quia, libero sit ab nesciunt facilis? Cupiditate aspernatur ipsam cumque iste modi! Voluptates vero voluptatum ipsum pariatur et harum? Harum sapiente nobis exercitationem? Nam architecto impedit fugit soluta. Quae rerum labore sed quos adipisci ratione vel commodi, minima et, ipsum dolorum rem. Quod temporibus tempora maxime, quaerat minus odit quia dicta esse sit, ea accusantium error. Necessitatibus praesentium ab rem aliquid, sequi dignissimos tenetur sunt, placeat porro rerum omnis.
            </p>
      </section>
      
      <section className="policy-section" id='PrivacyPolicy'>
      <h3>Contact Us</h3>
            <p>
          +91 7788665544
            </p>
      </section>
      
   
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
