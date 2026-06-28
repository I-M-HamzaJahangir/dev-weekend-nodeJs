const express = require("express")
const { createShortUrl, getUrl } = require("../controllers/url.controller")

const router = express.Router()

router.post("/", createShortUrl)
router.get("/:shortCode", getUrl)

module.exports = router