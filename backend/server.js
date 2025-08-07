const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Serve static files from the frontend folder
app.use('/frontend',express.static(path.join(__dirname, '..', 'frontend')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: 'alinashforwork@gmail.com',      // replace with your email
        pass: process.env.GMAIL_APP_PASSWORD      
    }
});

// Contact form endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'alinashforwork@gmail.com',        // replace with your email
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        res.json({ success: true, message: 'Message sent to your email!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

transporter.verify(function(error, success) {
    if (error) {
        console.error('Transporter error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});


