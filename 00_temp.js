let express = require("express");
let userController = require("./controller/userController");

let app = express();

app.set("view engine", "ejs");

app.get("/", userController.handleUser);

app.listen(3000, ()=>{
    console.log("Server started");
})