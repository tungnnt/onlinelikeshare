const fs = require('fs')
    , es = require('event-stream')

const carryOutTask = require('./api/carry-out-task')
const getInstaTaskList = require('./api/get-insta-task-list')
const getMyTaskList = require('./api/get-my-task-list')
const getTiktokTaskList = require('./api/get-tiktok-task-list')
const register = require('./api/register')
const signIn = require('./api/sign-in')
const takeTask = require('./api/take-task')

const {
    randomString,
    randomName,
    randomCookie,
    randomPhone,
    randomIPHeader,
    randomDate,
    normalizeName,
    randomCSRF,
    randomFirstName,
    randomeBankNumber,
    randomUserAgent,
    randomIntegerAsString,
    randomImagePath
} = require('./helper/random')

require('./helper/createFolder')('data')

const ACCOUNTS_FILE = './data/uniquePhones.txt'
const ERROR_FILE = './data/errors.txt'

// const content = fs
//     .readFileSync('./data/accounts.txt', () => { })
//     .toString()
//     .split('\n')
//     .map(line => {
//         if (typeof line === 'string' && line.length > 0) {
//             const [phone, token] = line.split('|')

//             if (phone && token !== 'null') {
//                 fs.appendFileSync('./data/phones.txt', `${phone}\n`, () => { })
//             }
//         }
//     })

// let uniquePhones = fs
//     .readFileSync('./data/phones.txt', () => { })
//     .toString()
//     .split('\n')
//     .map(line => {
//         if (typeof line === 'string' && line.length > 0) {
//             return line.trim()
//         }
//     })

// uniquePhones = [...new Set(uniquePhones)]

// uniquePhones.map(phone => {
//     fs.appendFileSync('./data/uniquePhones.txt', `${phone}\n`, () => { })
// })

setImmediate(async () => {
    const s = fs.createReadStream(ACCOUNTS_FILE)
        .pipe(es.split())
        .pipe(es.mapSync(async line => {
            s.pause()

            try {
                const phone = line.trim()

                const cookie = randomCookie()

                let tiktokTasks = [], token

                while (true) {
                    response = await signIn(cookie, phone)

                    console.log(response.token)

                    token = response.token

                    response = await getTiktokTaskList(cookie, token)

                    if (Array.isArray(response.taskList) && response.taskList.length > 0) {
                        tiktokTasks = response.taskList

                        break;
                    }
                }

                response = await getInstaTaskList(cookie, token)

                const { taskList: instaTasks } = response

                const tasks = tiktokTasks
                    .concat(instaTasks)
                    .slice(0, 20)
                    .map(task => task.publishId)

                console.log(tasks.length)

                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i]) {
                        response = await takeTask(cookie, token, tasks[i])

                        console.log(response)
                    }
                }

                response = await getMyTaskList(cookie, token, '1')

                const { taskList: myTasks1 } = response

                response = await getMyTaskList(cookie, token, '2')

                const { taskList: myTasks2 } = response

                const orders = myTasks1
                    .concat(myTasks2)
                    .map(task => task.takeId)

                console.log(orders.length)

                for (let i = 0; i < orders.length; i++) {
                    const imagePath = randomImagePath()

                    response = await carryOutTask(cookie, token, imagePath, orders[i])

                    console.log(response)
                }

                s.resume()
            } catch (e) {
                fs.appendFile(ERROR_FILE, JSON.stringify({ err: e, data: line }) + '\n', () => { })

                s.resume()
            }
        }).on('error', function (err) {

        }).on('end', function () {

        }))
})