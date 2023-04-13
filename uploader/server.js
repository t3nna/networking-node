const net = require('net');
const fs = require('node:fs/promises')

const server = net.createServer((socket) => {
})

let fileHandle, fileWriteStream
server.on('connection', (socket) => {
    console.log('New connection')


    socket.on('data', async data => {
        if(!fileHandle){
            socket.pause() // pause receiving data from the client, because during below promise executing we're receiving a log of packages from socket
            fileHandle = await fs.open(`storage/test.txt`, 'w')
            fileWriteStream = fileHandle.createWriteStream() // the stream to write to

            // writing to our destination
            fileWriteStream.write(data)

            socket.resume() // resume receiving data from the client
            fileWriteStream.on('drain', ()=>{
                socket.resume()
            })
        }
        else{
            if(!fileWriteStream.write(data)){
                socket.pause()
            }
        }



    })

    // This end event happens when the client.js file ends the socket
    socket.on('end', () =>{
        fileHandle.close()
        fileHandle=undefined
        fileWriteStream=undefined
        console.log(socket.readableEnded)
        console.log('Connection ended')
    })
})



server.listen(5050, '::1', () => {
    console.log('Uploader server opened on', server.address())
})