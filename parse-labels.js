const { readFileSync
} = require('fs');
// try {
//     const pr = JSON.parse(readFileSync('labels.json'))
//     console.log('pr = ', pr)
//     console.log('value = ', pr[0])
//     if (pr[0].find(i => i === 'BatchJobs')) {
//         console.log(true)
//         return
//     }
// } catch (e) {}
// console.log(false)

const labelDefinition = {
    bug: 'bugtest'
}

const labelsJSON = JSON.parse(readFileSync('labels.json'))
labelsJSON.join(' ')
// console.log('labels : ', labels)