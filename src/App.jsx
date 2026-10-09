import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function Header({ user }) {
  const [showProfile, setShowProfile] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    setShowProfile(false);
  }

  return (
    <header className="header">
      <Link className="logo" to="/">DEV@Deakin</Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/#articles">Articles</Link>
        <Link to="/#videos">Videos</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign Up</Link>}
      </nav>

      {user && (
        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() => setShowProfile(!showProfile)}
          >
            Profile
          </button>

          {showProfile && (
            <div className="profile-box">
              <h3>User Profile</h3>
              <p>{user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>DEV@Deakin</h3>
        <p>
          A platform for sharing knowledge, articles, and videos.
        </p>
      </div>

      <div className="footer-section">
        <h4>Explore</h4>
        <Link to="/">Home</Link>
        <Link to="/#articles">Articles</Link>
        <Link to="/#videos">Videos</Link>
      </div>

      <div className="footer-section">
        <h4>Account</h4>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>Contact us for more information.</p>
      </div>

      <div className="footer-bottom">
        <p>© 2026 DEV@Deakin. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DEV@Deakin</h1>
          <p>
            Discover helpful articles, learn new skills, and
            explore educational videos.
          </p>
          <a className="hero-link" href="#articles">
            Explore Articles
          </a>
        </div>
      </section>

      <section className="articles" id="articles">
        <h2>Latest Articles</h2>

        <div className="article-grid">
          <article className="article-card">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt="Person working on a computer"
            />
            <div className="article-content">
              <h3>Web Development</h3>
              <p>Learn the basics of creating modern websites.</p>
              <button onClick={() => alert("Web Development article selected.")}>
                Read More
              </button>
            </div>
          </article>

          <article className="article-card">
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800"
              alt="Programming code on a screen"
            />
            <div className="article-content">
              <h3>Learn Programming</h3>
              <p>Improve your programming and problem-solving skills.</p>
              <button onClick={() => alert("Programming article selected.")}>
                Read More
              </button>
            </div>
          </article>

          <article className="article-card">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
              alt="Team collaborating"
            />
            <div className="article-content">
              <h3>Technology</h3>
              <p>Explore new ideas and technology trends.</p>
              <button onClick={() => alert("Technology article selected.")}>
                Read More
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="videos" id="videos">
        <h2>Educational Videos</h2>

        <div className="video-grid">
          <article className="video-card">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
              alt="Laptop used for web development"
            />
            <div className="video-content">
              <h3>HTML and CSS</h3>
              <p>Understand the basics of website design.</p>
              <button onClick={() => alert("HTML and CSS video selected.")}>
                Watch Video
              </button>
            </div>
          </article>

          <article className="video-card">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
              alt="Code displayed on a monitor"
            />
            <div className="video-content">
              <h3>Programming Basics</h3>
              <p>Start learning programming step by step.</p>
              <button onClick={() => alert("Programming video selected.")}>
                Watch Video
              </button>
            </div>
          </article>

          <article className="video-card">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt="Online learning"
            />
            <div className="video-content">
              <h3>Online Learning</h3>
              <p>Discover useful resources for learning online.</p>
              <button onClick={() => alert("Online learning video selected.")}>
                Watch Video
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch {
      setError("Login failed. Please check your email and password.");
    }
  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Welcome back to DEV@Deakin!</p>

        <label htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </section>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/weak-password") {
        setError("Please use a stronger password.");
      } else {
        setError("Registration failed. Please check your details.");
      }
    }
  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <p>Join the DEV@Deakin community.</p>

        <label htmlFor="signup-email">Email Address</label>
        <input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          placeholder="Create a password (at least 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Sign Up</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

function AppContent() {
  const [user, setUser] = useState(auth.currentUser);

  useState(() => {
    return auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      <Header user={user} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
