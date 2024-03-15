import nodemailer from "nodemailer";

export const sendVerificationEmail = (token, email, username) => {
  const html = `
            <html>
            <body>
            <h1>Email Verification</h1>
            <p>Hello ${username},</p>
            <p>Thanks for registering with us. Please verify your email by clicking the link below.</p>
            <p><a href="${process.env.CLIENT_URL}/verify-email/${token}">Verify Email</a></p>
            <p>If you did not request this email, please ignore it.</p>
            <p>Thank you</p>
            </body>
            </html>
            `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const emailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html: html,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
