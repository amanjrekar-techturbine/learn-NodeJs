let fs = require("fs");
let http = require("http");
let express = require("express");

let app = express();

app.get("/", (req, res) => {
    fs.appendFileSync("log.txt", `${Date.now()} : ${req.method} ${req.path}`);
    res.send("This is a home page");
})

app.get("/about", (req, res) => {
    fs.appendFileSync("log.txt", `${Date.now()} : ${req.method} ${req.path}`);
    res.send("This is a about page");
})

app.get("/contact", (req, res) => {
    fs.appendFileSync("log.txt", `${Date.now()} : ${req.method} ${req.path}`);
    res.send("This is a contact page");
})

app.listen(3000, ()=>{
    console.log("Server Started")
})



