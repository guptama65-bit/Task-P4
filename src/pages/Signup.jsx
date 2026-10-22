import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "../GoogleButton";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully!");

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/weak-password") {
        setError("Please use a stronger password.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-intro">
        <span className="eyebrow">JOIN OUR COMMUNITY</span>
        <h1>Turn your curiosity into skills.</h1>
        <p>Discover resources, explore ideas and grow as a developer.</p>
      </div>

      <div className="auth-form">
        <h2>Create Your Account</h2>
        <p className="form-subtitle">
          Start your DEV@Deakin journey today.
        </p>

        <form onSubmit={handleSignup}>
          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <div className="form-divider"><span>or</span></div>

        <GoogleButton onError={setError} />

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </section>
  );
}
