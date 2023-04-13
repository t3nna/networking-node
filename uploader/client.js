const net = require('net')
const fs = require('node:fs/promises')

const socket = net.createConnection({host: '::1', port: 5050}, async () =>{
    const filePath = './textBig.txt'
    const fileHandle = await fs.open(filePath, 'r')
    const fileReadStream = fileHandle.createReadStream()

    // Reading form the source file
    fileReadStream.on('data', (data) =>{
        if(!socket.write(data)){
            fileReadStream.pause()
        }




    })
    socket.on('drain', ()=>{
        fileReadStream.resume()
    })
    // emits when we are done reading the file
    fileReadStream.on('end', ()=>{
        console.log('the file was successfully uploaded')
        // close socket
        socket.end()
    })
})