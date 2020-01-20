const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

function handleError(err, next) {
    if (err) {
        next(err);
    }
}

const sendEmail = (req, res, next) => {
    try {
        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'no-reply@miloe.one',
                pass: 'miloexb2019',
            },
        });
        const message = {
            from: 'miloe.one', // Sender address
            to: 'xubinqz@gmail.com', // List of recipients
            subject: 'test purpose', // Subject line
            text: 'send email succeed!', // Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
                handleError(err, next);
            } else {
                res.status(200).send({ message: info });
            }
        });
    } catch (err) {
        handleError(err, next);
    }
};

router.post('/sendEmail', sendEmail);

module.exports = router;
