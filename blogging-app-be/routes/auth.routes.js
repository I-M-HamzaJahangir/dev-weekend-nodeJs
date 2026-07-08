const express = require("express")
const { createUser, loginUser, logoutUser, getMe } = require("../controllers/auth.controller")
const checkAuth = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/me", checkAuth, getMe)




module.exports = router