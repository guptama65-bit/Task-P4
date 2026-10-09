import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to DEV@Deakin</h1>

        <p>
          Discover articles, tutorials and videos from the developer
          community. Learn new skills and connect with other developers.
        </p>

        <Link to="/signup" className="home-button">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;