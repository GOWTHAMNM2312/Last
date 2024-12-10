// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve the static HTML form
app.use(express.static('public'));

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { company_name, personal_name, company_address, contact_number, contact_email } = req.body;

    // Configure your email transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'balaji.imtex2025@gmail.com', // Replace with your email
            pass: '#Bapl@123$'   // Replace with your email password
        }
    });

    let mailOptions = {
        from: 'balaji.imtex2025@gmail.com',
        to: 'gowthamnm2312@gmail.com', // Replace with recipient email
        subject: 'New Contact Form Submission',
        text: `
            Company Name: ${company_name}
            Personal Name: ${personal_name}
            Company Address: ${company_address}
            Contact Number: ${contact_number}
            Contact Email: ${contact_email}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

