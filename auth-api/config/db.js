const mongoose = require("mongoose")

const connectDB = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/auth-api")
        console.log("DB connected successfully")
    }
    catch (error) {
        console.log("DB connection error", error)
    }
}

module.exports = connectDB