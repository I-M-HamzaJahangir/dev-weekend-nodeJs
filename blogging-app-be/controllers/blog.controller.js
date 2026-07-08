const Blog = require("../models/blog.model")
const { createBlogValidationSchema, updateBlogValidationSchema } = require("../validations/blog.validation")

const createBlog = async (req, res) => {

    const result = createBlogValidationSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues.map((issue) => ({
                field: issue.path[0],
                msg: issue.message
            }))
        })
    }

    const { title, content } = result.data

    try {
        const blog = await Blog.create({
            title,
            content,
            author: req.user.id,
            coverImageUrl: req.file
                ? `/uploads/${req.file.filename}`
                : null
        })
        return res.status(201).json({
            msg: "Blog created successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })
    }
}

const getBlogs = async (req, res) => {
    const { search } = req.query
    let query = {}

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit
    if (search) {
        query = {
            $or: [
                {
                    title:
                        { $regex: search, $options: "i" }
                },
                {
                    content:
                        { $regex: search, $options: "i" }
                }
            ]
        }
    }
    try {
        const [totalDocuments, blogs] = await Promise.all([
            Blog.countDocuments(query),
            Blog.find(query)
                .skip(skip)
                .limit(limit)
                .populate("author", "username name")
        ]);
        const totalPages = Math.ceil(totalDocuments / limit);
        return res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                page,
                limit,
                totalDocuments,
                totalPages,

            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "server error"
        })
    }
}

const getBlog = async (req, res) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id).populate("author", "username name")
        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "server error"
        })

    }

}

const updateBlog = async (req, res) => {
    const result = updateBlogValidationSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues.map((issue) => ({
                field: issue.path[0],
                msg: issue.message
            }))
        })
    }

    const { title, content } = result.data

    const { id: blogId } = req.params

    try {
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                msg: "Blog not found"
            });
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                msg: "Forbidden"
            })
        }

        const update = { title, content }
        if (req.file) {
            update.coverImageUrl = `/uploads/${req.file.filename}`
        }

        const newBlog = await Blog.findByIdAndUpdate(blogId, update, {
            new: true
        })

        // we have 2 query here but we can make it one like this
        // await Blog.findOneAndUpdate({
        //     _id: blogId,
        //     author: req.user.id
        // }, {
        //     title, content

        // }, {
        //     new: true
        // })

        return res.status(200).json({
            success: true,
            data: newBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "server error"
        })

    }




}

const deleteBlog = async (req, res) => {

    const { id: blogId } = req.params

    try {
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                msg: "Blog Not found"
            })
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                msg: "Forbidden"
            })
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId)
        return res.status(200).json({
            success: true,
            data: deletedBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server Error"
        })
    }
}


module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog }