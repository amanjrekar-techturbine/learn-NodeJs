let express = require("express");
let cookieParser = require('cookie-parser');
let app = express();

app.use(express.json());
app.use(cookieParser());            // Parse the cookie from req header // from string to object

app.get("/", (req, res)=>{
    console.log("Header : ", req.headers);
    console.log("Cookies : ", req.cookies.sessionId);      // req.cookies returns object else undefined

    res.cookie("uid", "abcd54321", {
        httpOnly : true,
        // domain: ".google.com"     // accessable to this domain only
        // maxAge: 24 * 60 * 60 * 1000, // 1 day
        // secure: true,  // Enable if using HTTPS
        // sameSite: 'strict' // Add for CSRF protection
    })
    res.end("Cookies has been set");
})

app.listen(3000, ()=>{
    console.log("Server Started");
})