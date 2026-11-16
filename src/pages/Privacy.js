import React from 'react';
import './Legal.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: October 27, 2026</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Payment information</li>
              <li>Account credentials</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send you lottery updates and premium content</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except in the 
              following circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>For legal compliance</li>
              <li>With service providers who assist in our operations</li>
              <li>To protect our rights and property</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service 
              and hold certain information. You can instruct your browser to refuse all cookies 
              or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for users under the age of 18. We do not knowingly 
              collect personal information from children under 18.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
              <br />
              Email: privacy@lottolink.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
