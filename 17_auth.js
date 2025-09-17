let express = require("express");
let Client = require("./model/clientModel");

let app = express();

app.use(express.json());

// Login Route
app
    .route("/login")
    .get("")

app.listen(3000, ()=>{
    console.log("Server Started");
})
