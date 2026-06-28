const isValidUrl = (urlString) => {
    try {
        const url = new URL(urlString)
        if (url.protocol === "https:" || url.protocol === "http:") {
            return true
        }
        return false
    }
    catch {
        return false
    }
}

const generateShortCode = (length = 6) => {
    const characters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789"
    let shortCode = "";

    for (let i = 0; i < length; i++) {
        const randomindex = Math.floor(Math.random() * characters.length)
        shortCode = shortCode + characters[randomindex]
    }

    return shortCode
}

module.exports = { isValidUrl, generateShortCode }