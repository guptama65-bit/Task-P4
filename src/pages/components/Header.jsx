
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header({ user }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      setShowProfile(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <header className="header">
      <Link className="logo" to="/">
        DEV<span>@</span>Deakin
      </Link>

      <nav className="nav">
        <a href="/#home">Home</a>
        <a href="/#about">About</a>
        <a href="/#articles">Articles</a>
        <a href="/#tutorials">Tutorials</a>
        <a href="/#gallery">Gallery</a>
        <a href="/#contact">Contact</a>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="nav-signup">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="profile-container">
            <button
              type="button"
              className="profile-button"
              onClick={() => setShowProfile(!showProfile)}
            >
              {user.displayName?.split(" ")[0] || "My Account"} ▾
            </button>

            {showProfile && (
              <div className="profile-box">
                <h3>My Account</h3>
                <p>{user.displayName || "Welcome!"}</p>
                <p>{user.email}</p>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
