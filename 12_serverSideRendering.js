let express = require("express");
let path = require("path");
let fs = require("fs");
let app = express();

let allURLs = ["ankit.aprils.com", "www.google.com", "www.ipl.com", "www.alexa.com"]

// To set view engine
app.set("view engine", "ejs")

// To tell express the location of EJS files
app.set("views", path.resolve("./views"))



app.get("/", (req, res) => {
    return res.render("home", {
        allURLs : allURLs
    });
})

app.listen(3000, ()=>{
    console.log("Server Started");
})




