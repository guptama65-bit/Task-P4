
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export default function GoogleButton({ onError }) {
  async function handleGoogleLogin() {
    onError("");

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        onError("Google sign-in was cancelled.");
      } else {
        onError(error.message);
      }
    }
  }

  return (
    <button
      type="button"
      className="google-button"
      onClick={handleGoogleLogin}
    >
      <span className="google-icon">G</span>
      Continue with Google
    </button>
  );
}
