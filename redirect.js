const http = require('http');

const port = 80
const hostname = "10.0.101.218"

const server = http.createServer((req, res) => {
    const data ={
        message: "Ha ha ha I hacked you!"
    }


    res.setHeader("Content-Type", "application/json")
    res.setHeader("Connection", "close")
    res.statusCode = 200
    res.end(JSON.stringify(data))
}
)

server.listen(port,  () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})