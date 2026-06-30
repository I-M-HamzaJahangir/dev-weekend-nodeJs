const User = require("../models/user.model")
const { hashPassword, verifyHash, generateJWTToken } = require("../utils/helper")
const { createUserValidationSchema, loginValidationSchema } = require("../validations/auth.validations")

const createUser = async (req, res) => {

    const result = createUserValidationSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message
            }))
        })
    }

    const data = result.data
    const { username, name, email, password } = data

    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(409).json({
                msg: "Email Already Exist"
            })
        }
        const securePassword = await hashPassword(password)
        await User.create({
            username,
            name,
            email,
            password: securePassword
        })

        return res.status(201).json({
            mg: "User Created Successfully"
        })

    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            msg: "Server Error"
        })

    }

}


const loginUser = async (req, res) => {

    const result = loginValidationSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message
            }))
        })
    }

    const { email, password } = result.data

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                msg: "User Not Found"
            })
        }

        const isValid = await verifyHash(password, user.password)
        if (!isValid) {
            return res.status(401).json({
                msg: "Invalid password"
            })
        }

        const token = generateJWTToken(user)
        res.cookie("app_acces_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 8 * 60 * 60 * 1000
        })

        return res.status(200).json({ msg: "Login Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server Error"
        })

    }




}


module.exports = { createUser, loginUser }