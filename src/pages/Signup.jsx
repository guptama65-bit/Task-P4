
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName.trim()
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: fullName.trim(),
        email: user.email,
        createdAt: serverTimestamp()
      });

      setMessage("Account created successfully!");

      setTimeout(() => navigate("/"), 1000);

    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered. Please login.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must contain at least 6 characters.");
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
        <p>
          Discover resources, explore ideas and grow as a developer.
        </p>
      </div>

      <div className="auth-form">
        <h2>Create a DEV@Deakin Account</h2>

        <p className="form-subtitle">
          Start your DEV@Deakin journey today.
        </p>

        <form onSubmit={handleSignup}>
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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

          <label htmlFor="signup-confirm-password">
            Retype Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
