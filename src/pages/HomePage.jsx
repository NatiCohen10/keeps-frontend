import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      {/* Introduction Section */}
      <section>
        <h1>Simplify Your Tasks, Focus on What Matters</h1>
        <p>Taskly helps you manage tasks effortlessly and stay organized.</p>
      </section>

      {/* Key Features Section */}
      <section>
        <h2>Key Features</h2>
        <ul>
          <li>
            <h3>Task Management</h3>
            <p>Create, organize, and prioritize tasks with ease.</p>
          </li>
          <li>
            <h3>Reminders & Notifications</h3>
            <p>Set reminders and receive notifications to stay on track.</p>
          </li>
          <li>
            <h3>Collaboration</h3>
            <p>Share tasks and collaborate seamlessly with your team.</p>
          </li>
        </ul>
      </section>

      {/* Why Choose Taskly? */}
      <section>
        <h2>Why Choose Taskly?</h2>
        <p>
          Taskly simplifies your workflow, increases productivity, and keeps you
          organized.
        </p>
        {/* User Testimonials */}
        <div>
          <blockquote>
            "Taskly has transformed how we manage projects. Highly recommended!"
            <footer>- John Doe, CEO</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <h2>FAQs</h2>
        <div>
          <div>
            <h3>Is Taskly free to use?</h3>
            <p>
              Taskly offers a free basic plan with premium options available.
            </p>
          </div>
          <div>
            <h3>How secure is Taskly?</h3>
            <p>
              Taskly prioritizes user data security with advanced encryption.
            </p>
          </div>
        </div>
      </section>

      {/* Download/Sign Up Section */}
      <section>
        <h2>Get Started with Taskly Today!</h2>
        <p>
          Sign up for early access and start managing your tasks more
          effectively.
        </p>
        <Link to="/register">Sign Up Now</Link>
      </section>

      {/* About Us Section */}
      <section>
        <h2>About Us</h2>
        <p>
          Taskly is developed by a team passionate about improving productivity
          through innovative solutions.
        </p>
        <p>
          Our mission is to simplify task management for individuals and teams.
        </p>
      </section>

      {/* Contact Information */}
      <section>
        <h2>Contact Us</h2>
        <p>
          For support inquiries, contact us at{" "}
          <a href="mailto:support@taskly.com">support@taskly.com</a>
        </p>
        {/* Social Media Links */}
        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <nav className="footer-nav">
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
