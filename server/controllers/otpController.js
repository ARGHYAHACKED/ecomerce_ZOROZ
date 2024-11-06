// backend/controllers/otpController.js
const nodemailer = require('nodemailer');

// Configure Nodemailer with your email provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., 'gmail', 'hotmail')
    auth: {
        user: process.env.EMAIL_USER, // Your email address (set in .env)
        pass: process.env.EMAIL_PASS, // Your email password (set in .env)
    },
});

// Generate and send OTP
const sendOtpEmail = async (req, res) => {
    const { email } = req.body;

    // Generate a 3-digit OTP
    const otp = Math.floor(100 + Math.random() * 900);

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Payment Verification',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ otp, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

module.exports = { sendOtpEmail };
