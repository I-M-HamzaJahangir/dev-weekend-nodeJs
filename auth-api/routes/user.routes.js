const express = require("express")
const { getProfile, getUser } = require("../controllers/user.controller")
const authMiddleware = require("../middlewear/auth.middlewear")

const router = express.Router()


router.get("/", authMiddleware, getUser)
router.get("/profile", authMiddleware, getProfile)


module.exports = router