let fs = require("fs");
let express = require("express");

let app = express()

app.use((req, res, next) => {
    console.log("This is middleware 1")
    next()
})

app.use((req, res, next) => {
    console.log("This is middleware 2")
    fs.appendFile("log.txt", `\n${Date.now()} : ${req.method} ${req.path}`, (err)=>{

    })
    next()
})

app.get("/api/users/:id", (req, res)=>{
    let id = req.params.id;
    res.json({ status : "success", id })
})

app.listen(3000, ()=>{
    console.log("Server Started");
})