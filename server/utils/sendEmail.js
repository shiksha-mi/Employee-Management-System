import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Employee Management System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

  } catch (error) {
    console.log("❌ Email Error:", error.message);
  }
};

export default sendEmail;