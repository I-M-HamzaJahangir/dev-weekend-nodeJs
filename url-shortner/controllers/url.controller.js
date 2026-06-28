const Url = require("../models/urls.model")
const { isValidUrl, generateShortCode } = require("../utils/helper")

const createShortUrl = async (req, res) => {
    const body = req.body

    // just found new method to validate url ==> URL.canParse() ==> return boolean  URL.parse() ==> return URL object
    if (!isValidUrl(body.orgUrl)) {
        return res.status(400).json({ msg: "invalid url" })
    }
    const shortCode = generateShortCode(6)
    try {
        const url = await Url.create({
            orgUrl: body.orgUrl,
            shortUrl: shortCode,
            clicks: 0
        })
        res.status(201).json({
            msg: "url created succesfully", shortUrl: `http://localhost:8000/api/url/${url.shortUrl}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" });
    }

}

const getUrl = async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        const url = await Url.findOneAndUpdate(
            { shortUrl: shortCode },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        if (!url) {
            return res.status(404).json({ msg: "not found" });
        }

        return res.redirect(url.orgUrl);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" });
    }
};
module.exports = { getUrl, createShortUrl }