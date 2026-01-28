import React from 'react';

const Advertise = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Advertise With Us</h1>
        <p className="page-subtitle">Reach millions of engaged readers</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>Why Advertise on SamacharX?</h2>
          <p>
            SamacharX reaches millions of readers every month across diverse demographics 
            and interests. Our platform offers targeted advertising solutions to help your 
            brand connect with the right audience.
          </p>
        </section>

        <section className="content-section">
          <h2>Advertising Options</h2>
          <div className="advertising-options">
            <div className="ad-option">
              <h3>Display Ads</h3>
              <p>Banner ads, sidebar placements, and premium homepage positions</p>
            </div>
            <div className="ad-option">
              <h3>Sponsored Content</h3>
              <p>Native advertising that blends seamlessly with our editorial content</p>
            </div>
            <div className="ad-option">
              <h3>Newsletter Sponsorship</h3>
              <p>Reach our engaged subscriber base through newsletter placements</p>
            </div>
            <div className="ad-option">
              <h3>Video Advertising</h3>
              <p>Pre-roll, mid-roll, and post-roll video ad placements</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Our Audience</h2>
          <ul className="audience-stats">
            <li>📊 5M+ monthly visitors</li>
            <li>🌍 Global reach across 150+ countries</li>
            <li>📱 70% mobile audience</li>
            <li>👥 Engaged and informed readers</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Get Started</h2>
          <p>
            Ready to advertise with us? Contact our advertising team to discuss 
            your goals and create a customized campaign.
          </p>
          <p>
            <strong>Email:</strong> advertising@samacharx.com<br />
            <strong>Phone:</strong> +1 (555) 123-4568
          </p>
        </section>
      </div>
    </div>
  );
};

export default Advertise;
