const net = require('net')
const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve()

        })
    })
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve()
        })
    })
}

let id

const socket = net.createConnection({
    host: '127.0.0.1',
    port: 3008
}, async () => {
    console.log('connected to the server')

    async function ask() {
        const message = await rl.question("Enter a message > ")
        // move cursor 1 line up
        await moveCursor(0, -1)
        // clear the current line that the cursor is in
        await clearLine(0)
        socket.write(`${id}-message-${message}`)

    }

    ask()


    socket.on('data', async (data) => {
        // log an empty line
        console.log()
        // move the cursor one line up
        await moveCursor(0, -1)
        // clear that line that cursor just moved into
        await clearLine()

        if (data.toString('utf-8').substring(0, 2) === 'id') {
            // when we are getting the id...

            // everything from the third character up until the end
            id = data.toString('utf-8').substring(3)


            console.log(`Your id is ${id}!\n`)
        } else {
            // When we are getting a message...


            console.log(data.toString('utf-8'))

            ask()
        }


    })
})

// socket.on('close', () =>{
//     console.log('closed')
// })
socket.on('end', () => {
    console.log('connection was ended!')
})