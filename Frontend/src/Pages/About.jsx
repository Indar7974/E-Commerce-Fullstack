import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h1 className='about-name'>About Us</h1>
        <div className="about-image-container">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-boy-illustration-download-in-svg-png-gif-file-formats--motorcycle-scooter-transport-transportation-e-commerce-shopping-illustrations-2627456.png"
            alt="loading..."
            className="about-image"
          />
        </div>
        <p>
          Welcome to <strong>Filpcart Clone</strong> - your trusted destination for online shopping. 
          We offer a wide range of products at unbeatable prices, ensuring a smooth and secure shopping experience.
        </p>

        <h2>Our Mission</h2>
        <p>
          To deliver happiness and value by providing the most customer-centric e-commerce experience.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Latest electronics and gadgets</li>
          <li>Trendy fashion for men and women</li>
          <li>Home & kitchen essentials</li>
          <li>Daily deals and seasonal offers</li>
          <li>Fast delivery and secure payment</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          📧 Email: <a href="mailto:support@ecommerce.com">support@flipcartclone.com</a><br />
          📞 Phone: 1800-000-000<br />
          📍 Address: Gwalior, India
        </p>
      </div>
    </div>
  );
};

export default About;
