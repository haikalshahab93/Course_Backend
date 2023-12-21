const nodemailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

const BE_URL = process.env.BE_URL;

const transporter = nodemailer.createTransport(
  smtp({
    service: "gmail",
    auth: {
      user: "revouhaikal@gmail.com",
      pass: "haikal2502",
    },
  })
);

const sendMail = async (options) => {
  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    console.error("Mail send error:", error);
    return { success: false, error };
  }
};

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${BE_URL}verify-email/${token}`;

  const mailOptions = {
    from: "revouhaikal@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click on the link to verify your email: ${verificationLink}`,
  };

  return await sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${FE_URL}/reset-password/${resetToken}`;
  const mailOptions = {
    from: "revouhaikal@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: `Please click on the following link, or paste this into your browser to complete the process within one hour: \n\n${resetLink}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return await sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};