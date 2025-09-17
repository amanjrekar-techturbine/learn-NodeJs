let mongoose = require("mongoose");

let addressSchema = mongoose.Schema({
    street : {
        type : String,
        trim : true,
        required : true
    },

    city : {
        type : String,
        required : true,
        enum : ["Mumbai", "Alibaug", "Nagpur", "Nashik"]
    },

    pincode : {
        type : Number,
        required : true,
        unique : true
    }
})

let Address = mongoose.model("address", addressSchema);

module.exports = Address