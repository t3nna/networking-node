const net = require('net');
const fs = require('node:fs/promises')

const server = net.createServer((socket) => {
    console.log('New connection')



    socket.on('data', async data => {
        const fileHandle = await fs.open(`storage/test.txt`, 'w')
        const fileStream = fileHandle.createWriteStream()
        fileStream.write(data)

    })
})

server.on('connection', () =>{

})

server.listen(5050, '::1', () =>{
    console.log('Uploader server opened on', server.address())
})