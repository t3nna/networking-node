const net = require('net')

const socket = net.createConnection({
        host: '127.0.0.1', port: 3099
    },
    () => {
        const buff = Buffer.alloc(16700)
        buff[2] = 23
        // socket.write('A simple message coming from simple sender!')
        socket.write(buff)
    })