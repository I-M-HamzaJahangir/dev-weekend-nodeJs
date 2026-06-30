

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


const JWT_SEC = "+oma9_CNj$9a%=eQaGSzpFWQT{Kc5XB9g,W@2$r:ZFe"

const generateJWTToken = (user) => {
    const payoad = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payoad, JWT_SEC, { expiresIn: "8h" })
}

const verifyJWTToken = (token) => {
    return jwt.verify(token, JWT_SEC)
}

module.exports = { hashPassword, verifyHash, generateJWTToken, verifyJWTToken }