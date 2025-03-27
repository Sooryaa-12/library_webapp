import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Get email from environment variable
    pass: process.env.EMAIL_PASS, // Get password from environment variable
  },
});

export async function sendRejectionEmail(userEmail, reason) {
  try {
    await transporter.sendMail({
      from: `"Library Management" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Renewal Request Rejected",
      text: `Dear User,\n\nYour renewal request has been rejected for the following reason:\n\n"${reason}"\n\nRegards,\nLibrary Management Team`,
    });

    console.log("Rejection email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
