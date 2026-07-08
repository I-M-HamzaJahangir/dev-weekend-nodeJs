const { z } = require("zod")


const createBlogValidationSchema = z.object({
    title: z.string("Title is required.").min(1, "Title is required."),
    content: z.string("Blog content is required.").min(1, "Blog content is required.")

})

const updateBlogValidationSchema = createBlogValidationSchema.extend({})
module.exports = { createBlogValidationSchema, updateBlogValidationSchema }