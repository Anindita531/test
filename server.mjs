import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const transporter = nodemailer.createTransport({
  host: "74.125.69.109",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    servername: "smtp.gmail.com"
  },
  connectionTimeout: 20000
});

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Gmail SMTP Mail Test Running");
});

// Send Mail Route
app.get("/send-mail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"Render Test" <${process.env.GMAIL_USER}>`,
      to: process.env.TEST_EMAIL,
      subject: "✅ Render Gmail SMTP Success",
      html: `
        <h2>Hello Anindita 👋</h2>
        <p>Your Gmail SMTP on Render is working successfully 🎉</p>
      `
    });

    res.send("✅ Mail Sent Successfully");
  } catch (error) {
    console.log(error);
    res.send("❌ Mail Failed: " + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
