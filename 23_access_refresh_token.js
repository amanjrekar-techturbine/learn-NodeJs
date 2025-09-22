let jwt = require("jsonwebtoken");

// creating access token : 

let createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" })
}

// creating refresh token :

let createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "21d" })
}