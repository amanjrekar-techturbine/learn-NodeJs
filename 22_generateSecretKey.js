// To generate secret key :

let crypto = require("crypto");

let generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}