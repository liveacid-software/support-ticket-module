const axios = require('axios').default;
const { Octokit } = require('@octokit/rest');

const createIssue = (ticket, files, config) => {
    const octokit = new Octokit({
        auth: config.github.token
    });

    const body = `Submitter Email: ${ticket.submittedBy?.email}\n Ticket Id: ${ticket._id}\n Priority:${ticket.priority}\n Body:${ticket.body} ${fileEmbeds}`;


    return octokit.issues.create({
        owner: 'liveacid-software',
        repo: config.github.repo,
        title: ticket.subject,
        body: body,
        labels: ['support']
    }).then((issueResponse) => {

        const issueNumber = issueResponse.data.number;

        // Upload file as a comment on the GitHub issue
        const fileComment = files.map((file) => {

            return octokit.issues.createComment({
                owner: 'liveacid-software',
                repo: config.github.repo,
                issue_number: issueNumber,
                body: '',
                mediaType: {
                    previews: ['comfort-fade'],
                },
                headers: {
                    'content-type': `multipart/form-data; boundary=${file.content.toString('hex')}`,
                },
                data: file.content,
            });
        })
        return Promise.all(fileComment)
            .then(() => {
                res.json({ message: 'GitHub issue created successfully' });
            })


    }).catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Failed to create GitHub issue' });
    })
    // let fileEmbeds = '\n';
    // files.forEach(file => {
    //     fileEmbeds += '\n![attachment](' + file + ')';
    // });
    // const body = `Submitter Email: ${ticket.submittedBy?.email}\n Ticket Id: ${ticket._id}\n Priority:${ticket.priority}\n Body:${ticket.body} ${fileEmbeds}`;

    // const data = {
    //     "title": `${ticket.subject}`,
    //     "body": body,
    //     "labels": ["support"]
    // }

    // return axios.post(
    //     `https://api.github.com/repos/liveacid-software/${config.github.repo}/issues`,
    //     data,
    //     {
    //         headers: { Authorization: `Bearer ${config.github.token}` },
    //     }
    // ).catch((error) => {
    //     console.log('error creating github issue', error);
    // });

}

const splitAndTruncate = filename => {
    var parts = filename.split('.');
    let cleanName = (parts.length > 2) ? parts.slice(0, parts.length - 1).join('.') : parts[0];
    cleanName = (cleanName.length > 50) ? cleanName.slice(0, 49) : cleanName;
    return {
        main: cleanName,
        ext: parts[parts.length - 1]
    };
}

const uploadFiles = async (files, config) => {
    let fileUrls = [];
    await Promise.all(files.map(async (file) => {
        const fileName = splitAndTruncate(file.name);
        const data = {
            "message": 'user file: ' + fileName.main,
            "content": file.content
        }
        const result = await axios.put(
            `https://api.github.com/repos/liveacid-software/support-ticket-images/contents/${fileName.main}-${Date.now()}.${fileName.ext}`,
            data,
            {
                headers: { Authorization: `Bearer ${config.github.token}` },
            }
        ).catch((error) => {
            console.log('error uploading file', error);
            return;
        });

        if (result.status === 201) {
            fileUrls.push(result.data?.content?.download_url);
        } else {
            throw new Error('upload file response has no download_url');
        }
    }));
    return fileUrls;
}

module.exports = {
    createIssue,
    uploadFiles
}