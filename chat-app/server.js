const net = require('net')

const server = net.createServer()

const clients = []

server.on('connection', socket =>{
    console.log('A new connection to the server ')


    const clientId = clients.length + 1


    clients.map((client) =>{
        client.socket.write('User '+ clientId + ' joined')
    })



    socket.write(`id-${clientId}`)

    socket.on('data', (data) =>{
        const dataString = data.toString('utf-8')
        console.log(dataString)
        const id = dataString.substring(0, dataString.indexOf('-'))
        const message = dataString.substring(dataString.indexOf('-message-') + 9)
        clients.map(client =>{
            client.socket.write(`> User ${id}: ${message}`)
        })

    })
    // Broadcasting a message to everyone when sb leaves chat
    socket.on('end', () =>{
        clients.map((client) =>{
            client.socket.write('User '+ clientId + ' left!')
        })
    })


    clients.push({
        socket,
        id: clientId.toString()
    })
})


server.listen(3008, '127.0.0.1', () =>{
    console.log('open server on ', server.address())
})