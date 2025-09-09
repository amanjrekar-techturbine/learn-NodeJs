let http = require("http");
let fs = require("fs")
let url = require("url")
let express = require("express")

let app = express()                 // Create an instance of an Express application

// 🎈 Example 1 : Using plain nodeJS

// function handler(req, res){
//     if(req.url === "/favicon.ico"){return res.end()}

//     let myURL = url.parse(req.url)

//     fs.appendFile("log.txt", `${Date.now()} : ${req.method} ${myURL.pathname}\n`, (err)=>{
//         if(err){
//             console.log(err.message)
//         }
//     })

//     switch(myURL.pathname){
//         case "/":
//             return res.end("This is a Home Page.");
//             break;
//         case "/about":
//             return res.end("This is a About Page.");
//             break;
//         case "/contact":
//             return res.end("This is a Contact Page.");
//             break;
//         default :
//             return res.end("404 Page Not Found")
//             break;
//     }
// }

// let myServer = http.createServer(handler)

// myServer.listen(3000, ()=>{
//     console.log("Server started")
// })

// 🎈 Example 2 : Using expressJS to build server

app.get("/", (req, res)=>{
    // console.log(req.query)                               // Query Paramter Object { name: 'sahil', id: '202' }
    // console.log(req.headers)                             // Returns Obj containing headers
    // console.log(req.method);                             // Returns http method
    // console.log(req.url);                                // /?name=sahil&id=202
    // console.log("req.path : " + req.path)                // /about
    // console.log("req.hostname : " + req.hostname)        // localhost
    // console.log("req.protocol : " + req.protocol)        // http
    // console.log("req.cookies : " + req.cookies)          // Cookies (if cookie-parser middleware is used)
    // console.log("req.ip : " + req.ip)                    // IP address of the client
    
    return res.send(`This is a home page.`)
})

app.get("/about", (req, res)=>{
    return res.send(`This is a about page. Your Name is ${req.query.name} and age is ${req.query.age}`)
})

app.get("/contact", (req, res)=>{
    return res.send(`This is a contact page. Your Name is ${req.query.name} and age is ${req.query.age}`)
})

app.listen(3000, ()=>{
    console.log("Server started")
})






