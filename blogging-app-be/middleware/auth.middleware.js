const { verifyJWTToken } = require("../utils/helper")

const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.app_acces_token
        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        const decoded = verifyJWTToken(token)

        req.user = decoded

        next()


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: "Unauthorized"
        })

    }

}

module.exports = checkAuth