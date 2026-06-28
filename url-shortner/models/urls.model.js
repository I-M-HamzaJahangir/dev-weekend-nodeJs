const mongoose = require("mongoose")
const urlSchema = new mongoose.Schema({
    orgUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique:true
    },
    clicks: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema)

module.exports = Url