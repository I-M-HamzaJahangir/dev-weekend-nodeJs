const { verifyJWTToken } = require("../utils/helper")

const authMiddleware = (req, res, next) => {
    console.log(req)
    try {
        const token = req.cookies.access_token

        if (!token) return res.status(401).json({ msg: "Not authenticated" })

        const decode = verifyJWTToken(token)

        req.user = decode
        next()


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Sever Error"
        })
    }
}


module.exports = authMiddleware