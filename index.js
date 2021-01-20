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

setImmediate(async () => {
    let response

    const cookie = randomCookie()

    const phone = randomPhone()

    response = await register(cookie, phone)

    console.log(response)

    response = await signIn(cookie, phone)

    const { token, userId } = response

    console.log({ token, userId })

    require('fs').appendFileSync('./data/accounts.txt', `${phone}|${token}\n`, () => { })

    response = await getTiktokTaskList(cookie, token)

    const { taskList: tiktokTasks } = response

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

        response = await carryOutTask(cookie, token, imagePath)

        console.log(response)
    }
})