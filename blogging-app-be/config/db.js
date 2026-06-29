const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/blogging-app")
        console.log("DB connected")
    } catch (error) {
        console.log("DB connection failed", error)
    }
}

module.exports = connectDB