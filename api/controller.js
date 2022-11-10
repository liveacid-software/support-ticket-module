const config = require('../config')
const { getEmailTransport } = require('./email')
const { createIssue } = require('./github')
const ticketBuilder = require('./ticket')

const sendEuEmail = async function (transporter, to, ticketId) {

    try {

        let msg = "<h1> Your LiveACID WorkFlow Support Ticket </h1><br/><br/>";
        msg += "<p>Thank you for submitting a LiveACID WorkFlow support Ticket.</p><br/>";
        msg += "<p>Your support ticket number is:</p>" + ticketId + "<br/>";
        msg += "<p>We will address your ticket within 48hrs. If your ticket requires follow-up we will reach out to you via your email on your account</p><br/>";
        msg += "<br/><br/>Thank you!<br/> - <a href='http://www.liveacid.com/'>LiveACID Software</a>";

        const mailOptions = {
            from: '"LiveACID WorkFlow" <workflow@liveacid.com>', // sender address
            to: to, // list of receivers
            subject: 'Your LiveACID Support Ticket', // Subject line
            text: '', // plain text body
            html: msg, // html body
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.log('Error sending support ticket email: %O', err);
    }
}

const sendAdminEmail = async function (transporter, from, ticket) {

    try {

        let msg = "<h1> " + ticket.priority + " New LiveACID WorkFlow Support Ticket from: </h1>" + config.app + "<br/><br/>";
        msg += "<p>User Email: </p>" + from + "<br/>";
        msg += "<p>Ticket ID: </p>" + ticket._id + "<br/>";
        msg += "<p>Subject:</p>" + ticket.subject + "<br/>";
        msg += "<p>Priority:</p>" + ticket.priority + "<br/>";
        msg += "<p>Body: </p>" + ticket.body;

        const mailOptions = {
            from: 'workflow@livecaid.com', // sender address
            to: 'support@liveacid.com', // list of receivers
            replyTo: from,
            subject: ticket.priority + ' - New Support Ticket from: ' + config.app, // Subject line
            text: '', // plain text body
            html: msg, // html body
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.log('Error sending support ticket email: %O', err);
    }
}

const createTicket = async (req, res) => {
    const user = req.user; // IF no user return error
    // create mongo support record
    // sned support ticket to gihub API
    // email support ticket to users email if email exists

    if (!req.body.subject || !req.body.body) return res.status(500).send();

    try {

        const ticket = await ticketBuilder.saveTicket(user, req.body);

        const transporter = getEmailTransport(config)

        await sendEuEmail(transporter, user.email, ticket._id);

        await sendAdminEmail(transporter, user.email, ticket);

        await createIssue(ticket, config)

        res.json({ success: true });

    } catch (error) {

        console.log(error);
        res.json({ error: error, success: false });
    }
}

module.exports = {
    createTicket
}
