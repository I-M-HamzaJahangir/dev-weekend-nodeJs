require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const blogRoutes = require("./routes/blog.routes")
const connectDB = require("./config/db")

const app = express()

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT





app.use("/api/user", authRoutes)
app.use("/api/", blogRoutes)

const server = app.listen(PORT, () => {
    console.log(`server started at Port : ${PORT}`)
    connectDB()
})

server.on("error", (error) => {
    console.log("seomething went wrong", error)
})