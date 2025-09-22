let bcrypt = require("bcrypt");

let hashPassword = async (password) => {
    let hashedPassword = await 	 bcrypt.hash(password, 10);
    return hashedPassword;
}

// To compare hash password : 

let comparePassword = async (password, hashedPassword) => {
    let isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
}