let jwt = require("jsonwebtoken");

let secret_key = "APLO$123"

let sessionIdWithUsername = new Map();

function setClientSession(user){
    // sessionIdWithUsername.set(id, username);

    let payload = {
        username : user.username,
        role : user.role
    }

    return jwt.sign(payload, secret_key)


}

function getClientSession(token){
    return jwt.verify(token, secret_key)
}

module.exports = {
    setClientSession,
    getClientSession
}