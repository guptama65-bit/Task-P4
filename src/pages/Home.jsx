
import { useState } from "react";

const articles = [
  {
    category: "PROGRAMMING",
    title: "Getting Started with Coding",
    description: "Understand programming fundamentals and build your confidence one step at a time.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    rating: "5.0",
    link: "https://www.w3schools.com/",
    action: "Read learning resources",
  },
  {
    category: "ARTIFICIAL INTELLIGENCE",
    title: "Discover Artificial Intelligence",
    description: "Explore how intelligent systems learn from information and solve problems.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    rating: "4.0",
    link: "https://www.ibm.com/think/topics/artificial-intelligence",
    action: "Explore AI resources",
  },
  {
    category: "WEB DEVELOPMENT",
    title: "Build Your First Website",
    description: "Learn how HTML, CSS and JavaScript create interactive websites.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    rating: "5.0",
    link: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    action: "Start web learning",
  },
];

const tutorials = [
  {
    title: "HTML & CSS",
    description: "Learn the foundations of modern website design.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
    link: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
  },
  {
    title: "Programming",
    description: "Practise coding and develop problem-solving skills.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
    link: "https://www.w3schools.com/python/",
  },
  {
    title: "Artificial Intelligence",
    description: "Discover machine learning and intelligent systems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
    link: "https://www.ibm.com/think/topics/artificial-intelligence",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed.");
      }

      setMessage("Thank you! Your subscription was successful.");
      setName("");
      setEmail("");
    } catch (error) {
      setMessage(error.message || "Unable to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section id="home" className="hero">
        <div className="hero-overlay">
          <div className="hero-inner">
            <span className="hero-eyebrow">WELCOME TO MY PORTFOLIO</span>
            <div className="hero-name">Hey, I'm Mayank</div>
            <h1>
              Learning Today.
              <br />
              <span>Building Tomorrow.</span>
            </h1>
            <p>Artificial Intelligence &amp; Machine Learning Student</p>
            <a className="primary-button" href="#articles">
              Explore Articles →
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-layout">
          <div className="about-photo">
            <img src="/mayank.jpg" alt="Mayank Aggarwal" />
          </div>

          <div className="about-copy">
            <span className="section-eyebrow">GET TO KNOW ME</span>
            <h2>About Me</h2>
            <p className="about-intro">
              A little about my journey into technology.
            </p>
            <p>
              Hello! I'm Mayank Aggarwal, an Artificial Intelligence and
              Machine Learning student passionate about programming,
              web development, and intelligent technologies.
            </p>
            <p>
              I enjoy building practical projects and exploring how
              technology can solve real-world problems.
            </p>
            <a href="#contact" className="text-link">Let's connect →</a>
          </div>
        </div>
      </section>

      <section id="articles" className="articles-section">
        <div className="section-heading">
          <span className="section-eyebrow">READ. LEARN. GROW.</span>
          <h2>Latest Articles</h2>
          <p>Explore programming, AI and web development.</p>
        </div>

        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article.title}>
              <a href={article.link} target="_blank" rel="noreferrer">
                <img src={article.image} alt={article.title} />
              </a>

              <div className="article-body">
                <span className="article-category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>

                <div className="article-rating">
                  <span aria-label={`${article.rating} out of 5 stars`}>★★★★★</span>
                  <small>{article.rating}</small>
                </div>

                <a className="article-link" href={article.link} target="_blank" rel="noreferrer">
                  {article.action} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tutorials" className="tutorials-section">
        <div className="section-heading">
          <span className="section-eyebrow">LEARN SOMETHING NEW</span>
          <h2>Featured Tutorials</h2>
          <p>Build your skills with these learning topics.</p>
        </div>

        <div className="tutorial-grid">
          {tutorials.map((tutorial) => (
            <a
              className="tutorial-item"
              href={tutorial.link}
              target="_blank"
              rel="noreferrer"
              key={tutorial.title}
            >
              <img
                className="tutorial-image"
                src={tutorial.image}
                alt={tutorial.title}
                loading="lazy"
              />

              <div className="tutorial-content">
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>

                <div className="tutorial-rating">
                  <span aria-label={`${tutorial.rating} out of 5 stars`}>★★★★★</span>
                  <small>{tutorial.rating}</small>
                </div>

                <span className="tutorial-link">Start learning →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="newsletter" className="newsletter-section">
        <div className="newsletter-layout">
          <div className="newsletter-copy">
            <span className="section-eyebrow">STAY CONNECTED</span>
            <h2>Keep learning with<br />DEV@Deakin.</h2>
            <p>
              Subscribe to receive a welcome email and stay connected
              with programming and technology learning resources.
            </p>
          </div>

          <form className="newsletter-card" onSubmit={handleSubscribe}>
            <h3>Join our newsletter</h3>
            <p>Enter your details to subscribe.</p>

            <label htmlFor="newsletter-name">Your name</label>
            <input
              id="newsletter-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe Now →"}
            </button>

            {message && (
              <p className="newsletter-message" role="status">{message}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
