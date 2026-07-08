

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
    const saltRound = 12
    const hashedPassword = await bcrypt.hash(password, saltRound)
    return hashedPassword
}

const verifyHash = async (attemptedPassword, hashPassword) => {
    const isValid = await bcrypt.compare(attemptedPassword, hashPassword)
    return isValid
}


const generateJWTToken = (user) => {
    const payoad = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payoad, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { hashPassword, verifyHash, generateJWTToken, verifyJWTToken }