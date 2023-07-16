const axios = require('axios').default;
const crypto = require('crypto');

const createIssue = (ticket, files, config) => {

    let fileEmbeds = '\n';
    files.forEach(file => {
        fileEmbeds += '\n![attachment](' + file + ')';
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

const splitAndTruncate = (filename) => {
    var parts = filename.split('.');
    let cleanName = (parts.length > 2) ? parts.slice(0, parts.length - 1).join('.') : parts[0];
    cleanName = (cleanName.length > 50) ? cleanName.slice(0, 49) : cleanName;
    return {
        main: cleanName,
        ext: parts[parts.length - 1]
    };
}

const uploadFile = (file, config) => {

    console.log('file', file)
    console.log('file.name', file.name)
    const fileName = splitAndTruncate(file.name);
    console.log('fileName', fileName)
    const fileData = file.data.toString('base64');
    const data = {
        "message": 'user file: ' + fileName.main,
        "content": fileData
    }

    return axios.put(
        `https://api.github.com/repos/liveacid-software/support-ticket-images/contents/${fileName.main}-${Date.now()}.${fileName.ext}`,
        data,
        {
            headers: { Authorization: `Bearer ${config.github.token}` },
        }
    ).then((result) => {
        return result.data?.content?.download_url
    }).catch((error) => {
        return Promise.reject(new Error(`error uploading file to github: ${error.message}}`))
    })

}

module.exports = {
    createIssue,
    uploadFile
}