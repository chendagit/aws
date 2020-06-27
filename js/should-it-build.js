'use strict'

const https = require('https')
const bugLabelId = 2164230220
const pullRequestId = process.env.TRAVIS_PULL_REQUEST

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
        if (!labels || labels.length === 0) {
            console.log(`no labels found attached to PR ${pullRequestId}`)
            process.exit(1)
        }
    } catch (err) {
        console.error(`error parsing labels for PR ${pullRequestId}`)
        console.error(err)
        process.exit(1)
    }
    const bugLabel = labels.find(item => item.id === bugLabelId)
    if (bugLabel) {
        console.log(`bug label found on PR ${pullRequestId}`)
        process.exit(0)
    }
    console.log(`bug label not found on PR ${pullRequestId}`)
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