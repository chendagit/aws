'use strict'
const https = require('https')
const batchJobsLabelId = 2164230220
const pullRequestId = 7
const pullRequestUrl = `/repos/chendagit/aws/pulls/${pullRequestId}`
const options = {
    hostname: 'api.github.com',
    path: pullRequestUrl,
    method: 'GET',
    headers: {
        'User-Agent': 'node/https'
    }
}
const parseResponse = (res) => {
    let labels
    try {
        labels = JSON.parse(res).labels
        console.log("Labels: " + res)
        if (!labels || labels.length === 0) {
            console.log(`no labels found attached to PR ${pullRequestId}`)
            process.exit(1)
        }
    } catch (err) {
        console.error(`error parsing labels for PR ${pullRequestId}`)
        console.error(err)
        process.exit(1)
    }
    const batchJobsLabel = labels.find(item => item.id === batchJobsLabelId)
    if (batchJobsLabel) {
        console.log(`batchJobsLabel label found on PR ${pullRequestId}`)
        process.exit(0)
    }
    console.log(`batchJobsLabel label not found on PR ${pullRequestId}`)
    process.exit(1)
}
https.get(options, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        data += chunk
    })
    response.on('end', () => {
        parseResponse(data)
    })
}).on('error', (err) => {
    console.error('Error: ' + err.message)
})