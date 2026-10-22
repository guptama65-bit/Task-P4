
import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/subscribe", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();

  if (!name || !email) {
    return res.status(400).json({
      error: "Please provide your name and email address."
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "Please enter a valid email address."
    });
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
    return res.status(503).json({
      error: "The newsletter email service is not configured yet."
    });
  }

  try {
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Welcome to DEV@Deakin!",
      text: `Hi ${name}, thank you for subscribing to DEV@Deakin. Stay connected for programming and technology learning resources.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:28px;color:#172640">
          <h1 style="color:#315cf5">Welcome to DEV@Deakin!</h1>
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>Stay connected for programming, web development and AI learning resources.</p>
          <p>Happy learning!<br/>The DEV@Deakin Team</p>
        </div>
      `
    });

    return res.status(200).json({
      message: "Thank you for subscribing! Please check your email."
    });
  } catch (error) {
    console.error(
      "Newsletter email error:",
      error.response?.body || error.message
    );

    return res.status(500).json({
      error: "We could not send your welcome email. Please try again later."
    });
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

app.listen(PORT, () => {
  console.log(`Newsletter server running on http://localhost:${PORT}`);
});
