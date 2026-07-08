const express = require("express")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const blogRoutes = require("./routes/blog.routes")
const connectDB = require("./config/db")

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const PORT = 8000





app.use("/api/user", authRoutes)
app.use("/api/", blogRoutes)

const server = app.listen(PORT, () => {
    console.log(`server started at Port : ${PORT}`)
    connectDB()
})

server.on("error", (error) => {
    console.log("seomething went wrong", error)
})