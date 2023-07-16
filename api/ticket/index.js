
const { SupportTicket } = require('../../mongo');

const saveTicket = async (user, { subject, body, priority }) => {

    const ticket = new SupportTicket({
        submittedBy: user,
        subject,
        body,
        priority,
    })
    await ticket.save()
    return ticket

}

module.exports = {
    saveTicket
}