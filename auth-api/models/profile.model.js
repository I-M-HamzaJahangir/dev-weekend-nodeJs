const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "user"
    },
    bio: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    }

})

const Profile = mongoose.model('profile', profileSchema)


module.exports = Profile