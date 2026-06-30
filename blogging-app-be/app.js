const express = require("express")
const authRoutes = require("./routes/auth.routes")
const connectDB = require("./config/db")
const app = express()

app.use(express.json())

const PORT = 8000


app.use("/api/user", authRoutes)

const server = app.listen(PORT, () => {
    console.log(`server started at Port : ${PORT}`)
    connectDB()
})

server.on("error", (error) => {
    console.log("seomething went wrong", error)
})