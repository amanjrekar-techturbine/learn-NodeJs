let express = require("express");
let app = express();

app.get("/", (req, res) => {
    console.log(req.headers)                        // To read the request header                         
    res.setHeader("myName", "Ankit Manjrekar");     // To set the response header
    res.send("Success")
})

app.listen(3000, ()=>{
    console.log("Server Started")
})