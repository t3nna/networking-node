const net = require('net')

const server = net.createServer()

const clients = []

server.on('connection', socket =>{

    console.log('A new connection to the server ')


    socket.on('data', (data) =>{
        clients.map(s =>{
            s.write(data)
        })

    })



    clients.push(socket)
})


server.listen(3008, '127.0.0.1', () =>{
    console.log('open server on ', server.address())
})