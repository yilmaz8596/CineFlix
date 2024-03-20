import nodemailer from "nodemailer";

export const sendPasswordResetEmail = (token, email) => {
  const html = `
        <html>
        <body>
        <h1>Password Reset</h1>
        <p>Hello ${email},</p>
        <p>You requested a password reset for your account.</p>
        <p>Click this <a href="${process.env.CLIENT_URL}/reset-password/${token}">link</a> to reset your password.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you</p>
        </body>
        </html>
        `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const emailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset password request",
    html: html,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  }); // Add closing parenthesis here
};
