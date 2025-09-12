let express = require("express");
let userRoutes = require("./routes/userRoutes");

let app = express();

app.set("view engine", "ejs");

app.use("/users", userRoutes);

app.listen(3000, ()=>{
    console.log("Server Started");
});