import React from 'react';

const Privacy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last updated: January 19, 2026</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including when you 
            create an account, subscribe to our newsletter, or contact us. This may include 
            your name, email address, and other contact information.
          </p>
        </section>

        <section className="content-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and updates</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns and trends</li>
            <li>Protect against fraud and abuse</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with 
            third-party service providers who perform services on our behalf, such as 
            hosting, analytics, and email delivery.
          </p>
        </section>

        <section className="content-section">
          <h2>4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about 
            your browsing activities. You can control cookies through your browser settings.
          </p>
        </section>

        <section className="content-section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. 
            Contact us at privacy@samacharx.com to exercise these rights.
          </p>
        </section>

        <section className="content-section">
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of 
            any changes by posting the new policy on this page.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:<br />
            <strong>Email:</strong> privacy@samacharx.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
