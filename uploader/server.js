const net = require('net');
const fs = require('node:fs/promises')

const server = net.createServer((socket) => {
})

server.on('connection', (socket) => {
    console.log('New connection')
    let fileHandle, fileWriteStream


    socket.on('data', async data => {
        if(!fileHandle){
            socket.pause() // pause receiving data from the client, because during below promise executing we're receiving a log of packages from socket

            const indexOfDivider = data.indexOf("=>")
            const fileName = data.subarray(10, indexOfDivider).toString('utf-8')
            console.log(fileName)
            fileHandle = await fs.open(`storage/${fileName}`, 'w')
            fileWriteStream = fileHandle.createWriteStream() // the stream to write to

            // writing to our destination
            fileWriteStream.write(data.subarray(indexOfDivider+2))

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
        if(fileHandle) fileHandle.close()
        fileHandle=undefined
        fileWriteStream=undefined
        // console.log(socket.readableEnded)
        console.log('Connection ended')
    })
})



server.listen(5050, '::1', () => {
    console.log('Uploader server opened on', server.address())
})