const nodemailer = require("nodemailer");

// Create transporter once
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true only for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify connection
(async () => {
  try {
    await transporter.verify();
    console.log("Email server is ready");
  } catch (error) {
    console.error(" Email configuration error:", error.message);
  }
})();

// Send email
exports.sendMail = async (email, subject, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error.message);

    return {
      success: false,
      message: "Failed to send email",
    };
  }
};
