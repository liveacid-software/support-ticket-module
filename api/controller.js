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

        res.json({ success: true });

    } catch (error) {

        console.log(error);
        res.json({ error: error, success: false });
    }
}

module.exports = {
    createTicket
}