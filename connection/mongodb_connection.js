let mongoose = require("mongoose");

async function connectMongoDB(url){
    return mongoose.connect("mongodb+srv://amanjrekar_db_user:EgYJM2D8K7XezMag@cluster0.jgbyezp.mongodb.net/crud")
}

module.exports = {
    connectMongoDB
}

