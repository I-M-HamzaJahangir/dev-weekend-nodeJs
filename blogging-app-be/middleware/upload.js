
const multer = require("multer")

// we use ulter.diskstorage when we need to store file locally on our server

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads")
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const  upload = multer({ storage: storage })

// we need to use multer.memorystorage to store file on cloud service

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


module.exports = upload