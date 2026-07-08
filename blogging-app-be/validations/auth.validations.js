const { z } = require("zod")

const createUserValidationSchema = z.object({
    username: z.string("Username is required").trim().toLowerCase().min(1, "Username is required"),
    name: z.string("Name is required").trim().min(1, "Name is required"),
    email: z.string("Email is required").trim().toLowerCase().pipe(z.email("Invalid email format")),
    password: z.string("Password is required").trim().min(8, "Password must be at least 8 characters")

})
const loginValidationSchema = z.object({
    email: z.string("Email is required").trim().toLowerCase().pipe(z.email("Invalid email format")),
    password: z.string("Password is required").trim().min(8, "Password must be at least 8 characters")
})

module.exports = { createUserValidationSchema, loginValidationSchema }