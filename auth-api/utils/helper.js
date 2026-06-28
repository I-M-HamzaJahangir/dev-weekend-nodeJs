
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
    const saltRound = 12
    const hashedPassword = await bcrypt.hash(password, saltRound)
    return hashedPassword
}

const verifyPassword = async (loginAttemptPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(loginAttemptPassword, hashedPassword)
    return isMatch
}

const JWT_SEC_KEY = "Kz_,})lfS5m{nfncTTQOK3fWSv$^ZEeB(,s:o1vQN1y"

const generateJWTToken = (user) => {

    const payload = {
        id: user._id,
        email: user.email
    }

    return jwt.sign(payload, JWT_SEC_KEY, { expiresIn: "8h" })
}

const verifyJWTToken = (token) => {

    return jwt.verify(token, JWT_SEC_KEY)

}


module.exports = { hashPassword, verifyPassword, generateJWTToken, verifyJWTToken }