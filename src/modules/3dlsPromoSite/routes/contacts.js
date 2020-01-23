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

const sendEmail = (req, res, next) => {
    try {
        // console.log(req.body.params);
        const params = req.body.params;

        const message = {
            from: mailConfig.sendFrom, // Sender address
            to: isTestMode ? params.email: mailConfig.sendTo, // List of recipients
            subject: 'Someone just send a contact request to my first dashboard', // Subject line
            html: `
            <p>The contactor has submitted below contact information:</p>\
                <ul>
                <li>Email:    ${params.email}</li>
                <li>First name:    ${params.firstName}</li>
                <li>Last name:    ${params.lastName}</li>
                <li>Company:    ${params.company}</li>
                <li>Country:    ${params.country}</li>
                <li>Job Title:    ${params.jobTitle}</li>
                <li>Related Industry:    ${params.industry}</li>
                <li>would like more information on learning contents:    ${params.learningContentCheck ? 'Yes': 'No'}</li>
                <li>would like more information on Certification:    ${params.certCheck ? 'Yes': 'No'}</li>
                <li>would like more information about how to buy:    ${params.buyCheck ? 'Yes': 'No'}</li>
                <li>More details:    ${params.comment}</li>
            `,
        };
        transport.sendMail(message, function (err, info) {
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

{/* <li>Phone number:    ${params.phone}</li>
<li>Job Level:    ${params.jobLevel}</li>
<li>Department:    ${params.department}</li> */}