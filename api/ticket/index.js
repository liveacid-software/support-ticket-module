
const { SupportTicket } = require('../../mongo');

const saveTicket = async (user, body) => {

    const ticket = new SupportTicket({
        submittedBy: user,
        subject: body.subject,
        body: body.body,
        priority: body.priority,
    })
    await ticket.save()
    return ticket

}

module.exports = {
    saveTicket
}