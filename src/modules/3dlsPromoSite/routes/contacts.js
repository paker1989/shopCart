const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const router = express.Router();
const mailSetting = require('../config/accounts');

const isTestMode = config.mode == 'test';
const mailConfig = mailSetting[config.mode];

const transport = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    // secure: true,
    auth: {
        user: mailConfig.username,
        pass: mailConfig.pwd,
    },
});

function handleError(err, next) {
    if (err) {
        next(err);
    }
}

const test = (req, res, next) => {
    res.status(200).send('<html><body>Yes</body></html>');
};

const sendEmail = (req, res, next) => {
    try {
        console.log(req.body.params);
        const params = req.body.params;

        const message = {
            from: mailConfig.sendFrom, // Sender address
            to: isTestMode ? params.email : mailConfig.sendTo, // List of recipients
            subject:
                'Someone just send a contact request to my first dashboard', // Subject line
            html: `
            <p>The contactor has submitted below contact information:</p>\
                <ul>
                <li>Email:    ${params.email}</li>
                <li>First name:    ${params.firstName}</li>
                <li>Last name:    ${params.lastName}</li>
                <li>Company:    ${params.company}</li>
                <li>Country:    ${params.country}</li>
                <li>Phone:      ${params.phone}</li>
                <li>Job Title:    ${params.jobTitle}</li>
                <li>Related Industry:    ${params.industry}</li>
                <li>would like more information on learning contents:    ${
                    params.learningContentCheck ? 'Yes' : 'No'
                }</li>
                <li>would like more information on Certification:    ${
                    params.certCheck ? 'Yes' : 'No'
                }</li>
                <li>would like more information about how to buy:    ${
                    params.buyCheck ? 'Yes' : 'No'
                }</li>
                <li>More details:    ${params.comment}</li>
            `,
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

const testAcclaim = (req, res, next) => {
    var request = require('request');
    var options = {
        method: 'POST',
        url:
            'https://sandbox.youracclaim.com/v1/organizations/ff89ff72-bad6-49dd-81b6-03f515130258/badges',
        headers: {
            Accept: 'application/json',
            Authorization:
                'Basic UXd6anI2MDQ4T0lvdUFfdGhLeUtSd3VIQ29HUW12N3hLc1VROg==',
            'Content-Type': 'application/json',
        },
        formData: {
            recipient_email: 'binstdxu@gmail.com',
            issued_to_first_name: 'bin_std',
            issued_to_last_name: 'xu',
            badge_template_id: 'fb0e2ef1-54a4-4fc9-8796-53c0f3b75364',
            issued_at: '2020-03-17 09:41:00 -0500',
            'issuer_earner_id ': '96806',
        },
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.status(200).send(response.body);
    });
};
router.post('/testAcclaim', testAcclaim);

router.post('/sendEmail', sendEmail);
router.get('/test', test);

module.exports = router;
