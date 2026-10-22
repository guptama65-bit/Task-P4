
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <Link to="/" className="footer-logo">
            DEV@Deakin
          </Link>
          <p>
            Learn, create and share with a community
            passionate about technology.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <a href="/#about">About</a>
          <a href="/#articles">Articles</a>
          <a href="/#tutorials">Tutorials</a>
        </div>

        <div>
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <a href="/#newsletter">Newsletter</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 DEV@Deakin. All rights reserved.
      </div>
    </footer>
  );
}
