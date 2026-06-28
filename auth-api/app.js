const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const cookieParser = require("cookie-parser")



const app = express()
const PORT = 8000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth/", authRoutes)
app.use("/api/user", userRoutes)

const server = app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
    //connect DB after server started
    connectDB()
})

server.on('error', (error) => console.log(error))