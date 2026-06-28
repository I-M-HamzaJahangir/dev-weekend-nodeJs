
const mongoose = require("mongoose")
const connectDb = async () => {

    await mongoose.connect("mongodb://localhost:27017/url-shortner")
    console.log("mongoDB connected")

}

module.exports = connectDb