let express = require("express");
let cookieParser = require("cookie-parser");
let app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{

    // To get cookie
    let cookie = req.cookies
    console.log(cookie);

    // To set cookie :
    res.cookie("random", 1234, {
        httpOnly : true
    })
    res.end("Got the cookie");
})

app.listen(3000, ()=>{
    console.log("Server Started");
})