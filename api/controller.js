const config = require('../config')
const { getEmailTransport } = require('./email')
const { createIssue, uploadFile } = require('./github')
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

const sendAdminEmail = async function (transporter, from, ticket, files) {

    try {

        let msg = "<h1>" + ticket.priority + " - New LiveACID WorkFlow Support Ticket from: " + config.app + "</h1><br/><br/>";
        msg += `<p>User Email: ${from} </p><br/>`;
        msg += `<p>Ticket ID: ${ticket._id}</p><br/>`
        msg += `<p>Subject: ${ticket.subject}</p><br/>`;
        msg += `<p>Priority: ${ticket.priority}</p><br/>`;
        msg += `<p>Body: <br/>  ${ticket.body} </p>`;
        msg += files && files.length ? `<p>Attachment: </p> <br>` : ''

        const mailOptions = {
            from: '"LiveACID WorkFlow" <workflow@liveacid.com>', // sender address
            to: 'support@liveacid.com', // list of receivers
            replyTo: from,
            subject: ticket.priority + ' - New Support Ticket from: ' + config.app, // Subject line
            text: '', // plain text body
            html: msg, // html body,
            attachments: mkAttachments(files)
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.log('Error sending support ticket email: %O', err);
    }
}

const mkAttachments = (file) => {
    if (!file) {
        return null
    }

    if (config.email.api_key) {
        if (Array.isArray(files)) {
            return files.map(f => {
                return {
                    content: f.data,
                    filename: f.name,
                    disposition: 'attachment', // Set disposition as an attachment
                }
            })
        }
        return [
            {
                content: file.data,
                filename: file.name,
                disposition: 'attachment', // Set disposition as an attachment
            },
        ]
    }

    return {
        filename: file.name,
        content: file.data
    }

}

const createTicket = async (req, res) => {
    const user = req.user; // IF no user return error
    if (!user) return res.status(401)
    // create mongo support record
    // sned support ticket to gihub API
    // email support ticket to users email if email exists

    const files = req.files ? req.files.files : null
    const { subject, body, priority } = req.body;
    if (!subject || !body) return res.status(500).send();

    try {

        const ticket = await ticketBuilder.saveTicket(user, { subject, body, priority });

        const transporter = getEmailTransport(config);

        await sendEuEmail(transporter, user.email, ticket._id);

        await sendAdminEmail(transporter, user.email, ticket, files);

        let fileUrls = []
        if (files) {
            if (Array.isArray(files)) {   // we only allow two files promise.all does not work due to the github api
                const url1 = await uploadFile(files[0], config);
                fileUrls.push(url1);
                const url2 = await uploadFile(files[1], config);
                fileUrls.push(url2);
            } else {
                const url = await uploadFile(files, config);
                fileUrls.push(url);
            }
        }
        await createIssue(ticket, fileUrls, config);

        return res.status(201).send({ success: true });

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error, success: false });
    }
}

module.exports = {
    createTicket
}
