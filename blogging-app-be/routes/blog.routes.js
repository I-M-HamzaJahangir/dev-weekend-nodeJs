const express = require("express")
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller")
const checkAuth = require("../middleware/auth.middleware")
const validateMongoId = require("../middleware/validateMongoId")
const upload = require("../middleware/upload")

const router = express.Router()



router.post("/blog", checkAuth, upload.single("coverImageUrl"), createBlog)
router.get("/blogs", getBlogs)
router.get("/blog/:id", validateMongoId, getBlog)
router.put("/blog/:id", checkAuth, validateMongoId, upload.single("coverImageUrl"), updateBlog)
router.delete("/blog/:id", checkAuth, validateMongoId, deleteBlog)


module.exports = router