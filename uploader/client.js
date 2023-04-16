const net = require('net')
const fs = require('node:fs/promises')
const path  = require('path')


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

const socket = net.createConnection({host: '::1', port: 5050}, async () =>{
    // const filePath = './text.txt'
    const filePath= process.argv[2]
    const fileName = path.basename(filePath)
    console.log(fileName)
    const fileHandle = await fs.open(filePath, 'r')
    const fileReadStream = fileHandle.createReadStream()
    const fileSize = (await fileHandle.stat()).size // exact number of bits in the file

    // For showing the upload progress
    let uploadedPercentage = 0
    let bytesUploaded = 0


    socket.write(`filename: ${fileName} =>`)
    console.log() // to get a nice log for the progress percentage

    // Reading form the source file
    fileReadStream.on('data', async (data) =>{
        if(!socket.write(data)){
            fileReadStream.pause()
        }
        bytesUploaded += data.length // add the number of bytes to the variable
        let newPercentage = Math.floor((bytesUploaded/fileSize) * 100)

        if( newPercentage !== uploadedPercentage){
            uploadedPercentage = newPercentage
            await moveCursor(0, -1)
            await clearLine(0)

            console.log(`Uploading... ${uploadedPercentage }`)
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