import React from 'react';

const Careers = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Careers at SamacharX</h1>
        <p className="page-subtitle">Join our team of passionate journalists and innovators</p>
      </div>
      
      <div className="page-content">
        <section className="content-section">
          <h2>Work With Us</h2>
          <p>
            At SamacharX, we're always looking for talented individuals who are passionate 
            about journalism, technology, and storytelling. Join us in our mission to 
            deliver news that matters.
          </p>
        </section>

        <section className="content-section">
          <h2>Why Join SamacharX?</h2>
          <ul className="benefits-list">
            <li>🚀 Work on cutting-edge digital journalism projects</li>
            <li>💼 Competitive salary and benefits package</li>
            <li>🏠 Flexible work arrangements and remote options</li>
            <li>📚 Continuous learning and professional development</li>
            <li>🌟 Collaborative and inclusive work environment</li>
            <li>🎯 Opportunity to make a real impact</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Open Positions</h2>
          <div className="job-listings">
            <div className="job-card">
              <h3>Senior Reporter</h3>
              <p className="job-location">Remote / New York</p>
              <p>Looking for experienced journalists to cover breaking news and investigative stories.</p>
            </div>
            <div className="job-card">
              <h3>Full Stack Developer</h3>
              <p className="job-location">Remote</p>
              <p>Build and maintain our news platform using modern web technologies.</p>
            </div>
            <div className="job-card">
              <h3>Video Editor</h3>
              <p className="job-location">Los Angeles</p>
              <p>Create compelling video content for our digital platforms.</p>
            </div>
            <div className="job-card">
              <h3>Social Media Manager</h3>
              <p className="job-location">Remote</p>
              <p>Manage our social media presence and engage with our audience.</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Apply Now</h2>
          <p>
            Don't see a position that fits? We're always interested in hearing from 
            talented individuals. Send your resume and cover letter to:
          </p>
          <p>
            <strong>Email:</strong> careers@samacharx.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Careers;
