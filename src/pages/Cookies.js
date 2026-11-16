import React from 'react';
import './Legal.css';

const Cookies = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last Updated: October 27, 2026</p>

          <section>
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device 
              when you visit our website. They help us provide you with a better experience by 
              remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section>
            <h2>2. Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic 
              functions like page navigation and access to secure areas.
            </p>

            <h3>Performance Cookies</h3>
            <p>
              These cookies collect information about how visitors use our website, such as which 
              pages are visited most often. This data helps us improve our website.
            </p>

            <h3>Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make (such as your username 
              or language preference) and provide enhanced features.
            </p>

            <h3>Targeting/Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements more relevant to you and your interests.
            </p>
          </section>

          <section>
            <h2>3. Third-Party Cookies</h2>
            <p>
              We may use third-party services like Google Analytics, which may set their own cookies 
              to help us analyze website usage and improve our services.
            </p>
          </section>

          <section>
            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            <ul>
              <li>Browser Settings: Most browsers allow you to refuse or accept cookies</li>
              <li>Delete Cookies: You can delete cookies already stored on your device</li>
              <li>Third-Party Tools: Use privacy tools to manage tracking cookies</li>
            </ul>
            <p>
              Please note that blocking or deleting cookies may impact your user experience and 
              some features may not function properly.
            </p>
          </section>

          <section>
            <h2>5. Cookie Duration</h2>
            <p>
              <strong>Session Cookies:</strong> Temporary cookies that are deleted when you close 
              your browser.
              <br />
              <strong>Persistent Cookies:</strong> Remain on your device for a set period or until 
              you delete them.
            </p>
          </section>

          <section>
            <h2>6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
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

export default Cookies;
