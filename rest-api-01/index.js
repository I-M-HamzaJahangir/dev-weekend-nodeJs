const express = require("express")
const connectDB = require("./config/db")
const userRoutes = require("./routes/user.routes")
const app = express()

const PORT = 8080

//Middlewear other wise body is undefine this 
app.use(express.urlencoded({ extended: false }))

//DB connection
connectDB()

//user routes
app.use("/api/users", userRoutes)

const server = app.listen(PORT, () => console.log("server started"))
server.on("error", (error) => {
    console.log(error)
})