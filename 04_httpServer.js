let http = require("http");
let fs = require("fs")
let url = require("url")

// 🎈 Example 1 : Implementation

// let myServer = http.createServer((req, res) => {

//     if(req.url === "/favicon.ico"){return res.end()}

//     fs.appendFile("log.txt", `${Date.now()} : ${req.url}\n`, (err)=>{
//         if(err){
//             console.log(err.message)
//         }
//     })

//     res.end("Thankyou for visiting.")
// })

// myServer.listen(3000, ()=>{
//     console.log("Server started")
// })

// 🎈 Example 2 : Handling URL

let myServer = http.createServer((req, res) => {

    if(req.url === "/favicon.ico"){return res.end()}

    let myURL = url.parse(req.url)

    fs.appendFile("log.txt", `${Date.now()} : ${myURL.pathname}\n`, (err)=>{
        if(err){
            console.log(err.message)
        }
    })

    res.end("Thankyou for visiting.")
})

myServer.listen(3000, ()=>{
    console.log("Server started")
})
