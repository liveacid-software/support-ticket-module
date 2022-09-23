const { SupportTicket } = require('../mongo');
const config  = require('../config');
// const SMTP = config.email.smtp;
const fromEmail = config.email.from;

const sgOptions = {
  auth: {
    api_key: config.email.api_key
  }
};

const SMTP = config.email.smtp;

const sendEuEmail = async function(to, ticketId) {

    try {
        let transporter;
        if (config.email.api_key) // if sendgrid API
            transporter = nodemailer.createTransport(sgTransport(sgOptions));
        else // else SMTP
            transporter = nodemailer.createTransport(SMTP);

        let msg = "<h1> Your LiveACID WorkFlow Support Ticket </h1><br/><br/>";
            msg += "<p>Thank you for submitting a LiveACID WorkFlow support Ticket.</p><br/>";
            msg += "<p>Your support ticket number is:</p>"+ ticketId +"<br/>";
            msg += "<p>We will address your ticket within 48hrs. If your ticket requires follow-up we will reach out to you via your email on your account</p><br/>";
            msg += "<br/><br/>Thank you!<br/> - <a href='http://www.liveacid.com/'>LiveACID Software</a>";

        const mailOptions = {
        from: '"LiveACID WorkFlow" <developer@liveacid.com>', // sender address
        to: to, // list of receivers
        subject: 'Your LiveACID Support Ticket', // Subject line
        text: '', // plain text body
        html: msg, // html body
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

        const result = await transporter.sendMail(mailOptions);

        console.log('Email Sent: %O', result);
    } catch (err) {
        console.log('Error sending email: %O', err);
    }
}

const sendAdminEmail = async function(from, ticket) {

    try {
        let transporter;
        if (config.email.api_key) // if sendgrid API
            transporter = nodemailer.createTransport(sgTransport(sgOptions));
        else // else SMTP
            transporter = nodemailer.createTransport(SMTP);

        let msg = "<h1> New LiveACID WorkFlow Support Ticket from: </h1>" + config.company + "<br/><br/>";
            msg += "<p>Ticket ID: </p>"+ ticket._id +"<br/>";
            msg += "<p>Subject:</p>"+ ticket.subject +"<br/>";
            msg += "<p>Body: </p>" + ticket.body;

        const mailOptions = {
            from: from, // sender address
            to: 'developer@liveacid.com', // list of receivers
            subject: config.company + ' - New Support Ticket', // Subject line
            text: '', // plain text body
            html: msg, // html body
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

        const result = await transporter.sendMail(mailOptions);

        console.log('Email Sent: %O', result);
    } catch (err) {
        console.log('Error sending email: %O', err);
    }
}

const createTicket = async (req, res) => {
    const user = req.user; // IF no user return error
    // create mongo support record
    // sned support ticket to gihub API
    // email support ticket to users email if email exists

    console.log("REQUEST: ", req.body);

    const ticket = new SupportTicket({
        submittedBy: user,
        subject: req.body.subject,
        body: req.body.body
    });

    try {

        await ticket.save();

        await sendEuEmail( (user?.email || config.email.dafault_to), ticket._id);

        await sendAdminEmail( (user?.email || config.email.dafault_to), ticket);

        res.json({ success: true });

    } catch (error) {

        console.log(error);
        res.json({ error: error, success: false });
    }
}

module.exports = {
    createTicket
}