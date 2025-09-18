require("dotenv").config()          // .config() -> Loads .env file contents into process.env by default.
let express = require("express");

let app = express();

app.get("/", (req, res)=>{
    
    res.end("Hello world");
})

// To access environment variable
let port = process.env.PORT
console.log(port)

app.listen(port, ()=>{
    console.log("Server Connected");
})