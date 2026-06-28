const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
    // console.log(req.socket.remoteAddress) // get ip address of client
    //  console.log(req.headers) 
    //  create a log file 

    const log = `${Date.now()}::IP::${req.socket.remoteAddress}::New Request\n`
    fs.appendFile("log.txt", log, (err, data) => {
        if (err) {
            console.log(err)
            res.end("Something went wrong");
            return;
        }
        res.end("Hello from my First server");

    })


})

server.listen(8000, () => console.log("server started"));