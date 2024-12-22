import { createTransport } from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export function generateVerificationCode() {
  return crypto.randomBytes(6).toString("hex");
}

export async function sendVerificationEmail(user, code) {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Verify your email",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
}
