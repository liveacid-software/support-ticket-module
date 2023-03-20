const axios = require('axios').default;


const createIssue = (ticket, files, config) => {
    let fileEmbeds = '\n';
    files.forEach(file => {
        fileEmbeds += '\n <img alt="user uploaded image" src="' + file + '">';
    });
    const body = `Submitter Email: ${ticket.submittedBy?.email}\n Ticket Id: ${ticket._id}\n Priority:${ticket.priority}\n Body:${ticket.body} ${fileEmbeds}`;
    
    const data = {
        "title": `${ticket.subject}`,
        "body": body,
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

const uploadFiles = async (files, config) => {
    let fileUrls = [];
    await Promise.all(files.map(async (file) => {
        // UPLOAD FILE
        const data = {
            "message": 'user file upload: ' + file.name,
            "content": file.content
        }
        const result = await axios.put(
            `https://api.github.com/repos/liveacid-software/support-ticket-images/contents/${file.name}`,
            data,
            {
                headers: { Authorization: `Bearer ${config.github.token}` },
            }
        ).catch((error) => {
            console.log('error uploading file', error);
            return;
        });
        fileUrls.push(result.download_url);
    }));
    return fileUrls;
}

module.exports = {
    createIssue,
    uploadFiles
}