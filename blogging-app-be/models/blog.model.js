const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    coverImageUrl: {
        type: String,
    },
    coverImagePublicId : {
        type:String
    }


}, {
    timestamps: true
})

const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog