import React from 'react';

const AboutUs = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">About SamacharX</h1>
        <p className="page-subtitle">Your trusted source for news and information</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>Who We Are</h2>
          <p>
            SamacharX is a leading digital news platform committed to delivering accurate, 
            unbiased, and timely news from around the world. Since our inception, we have 
            been dedicated to keeping our readers informed about the events that matter most.
          </p>
        </section>

        <section className="content-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide comprehensive news coverage across various categories 
            including politics, business, technology, sports, entertainment, and more. We 
            strive to maintain the highest standards of journalism and deliver news that 
            empowers our readers to make informed decisions.
          </p>
        </section>

        <section className="content-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li><strong>Accuracy:</strong> We verify our sources and fact-check our stories</li>
            <li><strong>Integrity:</strong> We maintain editorial independence and transparency</li>
            <li><strong>Timeliness:</strong> We deliver breaking news as it happens</li>
            <li><strong>Diversity:</strong> We cover stories from multiple perspectives</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Contact Us</h2>
          <p>
            Have a story tip or feedback? We'd love to hear from you. 
            Visit our <a href="/contact">Contact page</a> to get in touch with our team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
