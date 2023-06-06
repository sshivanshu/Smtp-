const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { recipientEmail, link } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sshivanshu466@gmail.com', // Your email address
      pass: 'nqehjdkfdmgvcdou' // Your email password
    }
  });

  // Send email
  try {
    await transporter.sendMail({
      from: 'sshivanshu466@gmail.com', // Your email address
      to: recipientEmail,
      subject: 'Sample Email',
      html: `
        <h1>Welcome to the Example App!</h1>
        <p>Click the button below to submit:</p>
        <a href="${link}">
          <button>Submit</button>
        </a>
      `
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
