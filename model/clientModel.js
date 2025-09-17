let mongoose = require("mongoose");

// MongoDB connection
mongoose
    .connect("mongodb+srv://amanjrekar_db_user:EgYJM2D8K7XezMag@cluster0.jgbyezp.mongodb.net/crud")
    .then(() => { console.log("MongoDB connected"); })
    .catch((err) => { console.log(err.message) })

let clientSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        required : true,
        default : "USER",
        enum : ["ADMIN", "USER", "VISITOR"]
    }
}, {
    timestamp : true
})

let Client = mongoose.model("client", clientSchema);

module.exports = Client