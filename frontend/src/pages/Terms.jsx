import React from 'react';

const Terms = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-subtitle">Last updated: January 19, 2026</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using SamacharX, you accept and agree to be bound by these 
            Terms of Service. If you do not agree to these terms, please do not use our 
            services.
          </p>
        </section>

        <section className="content-section">
          <h2>2. Use of Service</h2>
          <p>
            You may use our service only for lawful purposes and in accordance with these 
            Terms. You agree not to:
          </p>
          <ul>
            <li>Use the service in any way that violates any applicable law or regulation</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
            <li>Impersonate or attempt to impersonate SamacharX or any other person or entity</li>
            <li>Use any automated system to access the service</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. Intellectual Property Rights</h2>
          <p>
            The content on SamacharX, including text, graphics, logos, images, and software, 
            is the property of SamacharX or its content suppliers and is protected by 
            copyright and other intellectual property laws.
          </p>
        </section>

        <section className="content-section">
          <h2>4. User Content</h2>
          <p>
            If you submit comments or other content to our service, you grant SamacharX a 
            non-exclusive, royalty-free, perpetual license to use, reproduce, and distribute 
            such content.
          </p>
        </section>

        <section className="content-section">
          <h2>5. Disclaimer of Warranties</h2>
          <p>
            Our service is provided "as is" and "as available" without warranties of any kind, 
            either express or implied. We do not warrant that the service will be uninterrupted 
            or error-free.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            SamacharX shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section className="content-section">
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of 
            the service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:<br />
            <strong>Email:</strong> legal@samacharx.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
