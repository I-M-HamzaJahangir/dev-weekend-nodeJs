const Profile = require("../models/profile.model")
const User = require("../models/user.model")
const { hashPassword, verifyPassword, generateJWTToken } = require("../utils/helper")

const createUser = async (req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ msg: "inavliad request" })
    try {
        const { name, email, password } = body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(409).json({ msg: "Email Already Exist" })
        // very !important you cannot insert passwrod directly to DB 
        // create hash for password then add that hash
        const securePassword = await hashPassword(password)
        const newUser = await User.create({ name, email, password: securePassword })
        await Profile.create({
            userId: newUser._id
        })
        return res.status(201).json({ msg: "Record Created Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "server errro" })
    }

}

const loginUser = async (req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ msg: "inavliad request" })

    try {
        const { email, password } = body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ msg: "User Not Found!" })

        const isValidPassword = await verifyPassword(password, user.password)
        if (!isValidPassword) return res.status(401).json({ msg: "Invalid Password" })

        const token = generateJWTToken(user)
        res.cookie(
            "access_token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            }
        )
        return res.status(200).json({ msg: "Login Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Server Error' })

    }

}


const getUser = async (req, res) => {
    const id = req.user.id
    try {
        const user = await User.findById(id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "server error"
        })

    }
}


const getProfile = async (req, res) => {
    const id = req.user.id

    try {
        const profile = await Profile.findOne({ userId: id }).populate("userId")
        res.status(200).json(profile)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}

module.exports = { createUser, loginUser, getUser,getProfile }