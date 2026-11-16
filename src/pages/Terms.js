import React from 'react';
import './Legal.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: October 27, 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Lotto Link, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these terms, please do not 
              use our service.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Lotto Link's 
              website for personal, non-commercial transitory viewing only.
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2>3. User Account</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. You are responsible for safeguarding the password 
              and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2>4. Lottery Information</h2>
            <p>
              Lotto Link provides lottery information for educational and entertainment purposes only. 
              We do not guarantee the accuracy of lottery results, numbers, or predictions. Users should 
              verify all information through official lottery sources.
            </p>
          </section>

          <section>
            <h2>5. Payment Terms</h2>
            <p>
              All payments for premium packages are non-refundable unless otherwise stated. 
              Subscription fees are charged in advance on a recurring basis.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall Lotto Link or its suppliers be liable for any damages arising out 
              of the use or inability to use the materials on Lotto Link's website.
            </p>
          </section>

          <section>
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes via email or through our website.
            </p>
          </section>

          <section>
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: support@lottolink.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
