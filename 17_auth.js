let express = require("express");
let Client = require("./model/clientModel");
let clientRouter = require("./routes/clientRouter");

let app = express();

app.use(express.json());

// Login Route
app.use("/api/clients/", clientRouter);

app.listen(3000, ()=>{
    console.log("Server Started");
})
