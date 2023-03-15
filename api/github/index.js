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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const uploadFiles = async (files, config) => {
    let fileUrls = [];
    await Promise.all(files.map(async (file) => {
        // READ FILE
        try {
            const cleanFile = await toBase64(file);
        } catch (error) {
            console.log('error reading file', error);
            return;
        }

        // UPLOAD FILE
        const data = {
            "message": 'user file upload: ' + file.name,
            "content": cleanFile,
            "branch": 'file-upload-test'
        }
        const result = await axios.put(
            `https://api.github.com/repos/liveacid-software/support-ticket-module/contents/user-uploaded-files`,
            data,
            {
                headers: { Authorization: `Bearer ${config.github.token}` },
            }
        ).catch((error) => {
            console.log('error creating github issue', error);
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