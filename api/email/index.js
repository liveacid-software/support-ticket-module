const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sgOptions = (config) => {
    auth: {
        api_key: config.email.api_key
    }
};

const SMTP = (config) => config.email.smtp;

const getEmailTransport = (config) => {
    if (config.email.api_key) { // if sendgrid API
        return nodemailer.createTransport(sgTransport(sgOptions(config)))
    }
    return nodemailer.createTransport(SMTP(config));
}

module.exports = {
    getEmailTransport
}