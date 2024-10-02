const Intern = require('../models/Intern');
const nodemailer = require('nodemailer');

exports.registerIntern = async (req, res) => {
    const {
        name,
        email,
        phone,
        domain,
        startDate,
        endDate,
        linkedInProfile,
        instaId,
        profileImage
    } = req.body;

    try {
        // Save intern details to the database
        let intern = new Intern({
            name,
            email,
            phone,
            domain,
            startDate,
            endDate,
            linkedInProfile,
            instaId,
            profileImage
        });

        await intern.save();

        // Set up Nodemailer transporter (Ensure these credentials are valid)
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.EMAIL_ID,  // Replace if needed
                pass: process.env.EMAIL_PASSWORD              // Replace if needed
            }
        });

        // Email options
        const mailOptions = {
            from: 'gokulgo53503@gmail.com',  // Your email
            to: intern.email,
            subject: 'Intern Registration Confirmation',
            text: `Dear ${intern.name},\n\nThank you for registering as an intern. We have received your details for the domain "${intern.domain}".\n\nWe will contact you soon for further steps.\n\nBest regards,`
        };

        // Send the email and handle response
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                // Return success but notify that email failed
                return res.status(201).json({ 
                    message: 'Intern registered successfully, but failed to send confirmation email', 
                    error: error.message,
                    intern 
                });
            }

            console.log('Email sent:', info.response);
            // Send success response once email is sent
            res.status(201).json({ 
                message: 'Intern registered successfully and confirmation email sent!', 
                intern 
            });
        });

    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({
            message: 'Server error, please try again later.'
        });
    }
};
