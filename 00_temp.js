let studentRoutes = require("./08_router")
let express = require("express")
let app = express()

app.get("/", (req, res) => {
    console.log(req.headers.yourname)
    res.setHeader("X-MyName", "Hello World");
    res.status(500).json({ name : "Ankit" })
})

app.listen(3000, () => {
    console.log("Server Started");
})