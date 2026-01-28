import React from 'react';

const Cookies = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cookie Policy</h1>
        <p className="page-subtitle">Last updated: January 19, 2026</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a 
            website. They are widely used to make websites work more efficiently and provide 
            information to website owners.
          </p>
        </section>

        <section className="content-section">
          <h2>How We Use Cookies</h2>
          <p>SamacharX uses cookies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Advertising Cookies:</strong> Deliver relevant advertisements to you</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Types of Cookies We Use</h2>
          
          <h3>Session Cookies</h3>
          <p>
            These are temporary cookies that expire when you close your browser. They help 
            us maintain your session as you navigate through our website.
          </p>

          <h3>Persistent Cookies</h3>
          <p>
            These cookies remain on your device for a set period or until you delete them. 
            They help us remember your preferences for future visits.
          </p>

          <h3>Third-Party Cookies</h3>
          <p>
            Some cookies are placed by third-party services such as analytics providers and 
            advertising networks.
          </p>
        </section>

        <section className="content-section">
          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored on your device</li>
            <li>Delete cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all third-party cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>
            Please note that blocking or deleting cookies may impact your experience on 
            our website and some features may not function properly.
          </p>
        </section>

        <section className="content-section">
          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted 
            on this page with an updated revision date.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at:<br />
            <strong>Email:</strong> privacy@samacharx.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Cookies;
