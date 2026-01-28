import React from 'react';

const Disclaimer = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Disclaimer</h1>
        <p className="page-subtitle">Last updated: January 19, 2026</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>General Information</h2>
          <p>
            The information provided by SamacharX is for general informational purposes only. 
            All information on the site is provided in good faith, however we make no 
            representation or warranty of any kind, express or implied, regarding the 
            accuracy, adequacy, validity, reliability, availability, or completeness of any 
            information on the site.
          </p>
        </section>

        <section className="content-section">
          <h2>External Links Disclaimer</h2>
          <p>
            The site may contain (or you may be sent through the site) links to other 
            websites or content belonging to or originating from third parties. Such external 
            links are not investigated, monitored, or checked for accuracy, adequacy, validity, 
            reliability, availability, or completeness by us.
          </p>
          <p>
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy 
            or reliability of any information offered by third-party websites linked through 
            the site.
          </p>
        </section>

        <section className="content-section">
          <h2>Professional Disclaimer</h2>
          <p>
            The site cannot and does not contain professional advice. The news and information 
            is provided for general informational and educational purposes only and is not a 
            substitute for professional advice.
          </p>
          <p>
            Accordingly, before taking any actions based upon such information, we encourage 
            you to consult with the appropriate professionals.
          </p>
        </section>

        <section className="content-section">
          <h2>Affiliates Disclaimer</h2>
          <p>
            The site may contain links to affiliate websites, and we may receive an affiliate 
            commission for any purchases made by you on the affiliate website using such links.
          </p>
        </section>

        <section className="content-section">
          <h2>Testimonials Disclaimer</h2>
          <p>
            The site may contain testimonials by users of our services. These testimonials 
            reflect the real-life experiences of those who have used our services in some way 
            or another. However, individual experiences may vary.
          </p>
        </section>

        <section className="content-section">
          <h2>Errors and Omissions</h2>
          <p>
            While we have made every attempt to ensure that the information contained on the 
            site is correct, SamacharX is not responsible for any errors or omissions, or for 
            the results obtained from the use of this information.
          </p>
        </section>

        <section className="content-section">
          <h2>Fair Use</h2>
          <p>
            We may use copyrighted material which has not always been specifically authorized 
            by the copyright owner. Such material is made available for educational purposes, 
            to advance understanding of human rights, democracy, scientific, moral, ethical, 
            and social justice issues.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at:<br />
            <strong>Email:</strong> legal@samacharx.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
