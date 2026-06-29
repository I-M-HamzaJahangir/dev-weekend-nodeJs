const express = require("express")

const app = express()

const PORT = 8000

const server = app.listen(PORT, () => {
    console.log(`server started at Port : ${PORT}`)
})

server.on("error", (error) => {
    console.log("seomething went wrong", error)
})