// setting up simple TCP server
const net = require("net")

const server = net.createServer((socket) =>{
    // duplex stream
    socket.on('data', (data) =>{
        console.log(data)
    })
})

server.listen(3099, '127.0.0.1', () =>{
    console.log( 'opened server on port', server.address())
})