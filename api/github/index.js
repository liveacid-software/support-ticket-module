const axios = require('axios').default;


const createIssue = (ticket, config) => {
    const data = {
        "Submitter Email": `${ticket.user.email}`,
        "title": `${ticket.subject}`,
        "body": `Ticket Id: ${ticket._id}\n Priority:${ticket.priority}\n Body:${ticket.body}`,
        "labels": ["support"]
    }
    return axios.post(
        `https://api.github.com/repos/liveacid-software/${config.github.repo}/issues`,
        data,
        {
            headers: { Authorization: `Bearer ${config.github.token}` },
        }
    ).catch((error) => {
        console.log('error creating github issue', error);
    });

}

module.exports = {
    createIssue
}