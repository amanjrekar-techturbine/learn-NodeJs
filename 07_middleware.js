let express = require("express");
let mock_data = require("./MOCK_DATA.json");
let fs = require("fs");
let app = express();

// app.use(express.urlencoded({ extended: false }))

// // To create custom middleware
// app.use((req, res, next)=>{
//     console.log("Hello from middleware 1");
//     next()
//     // return res.send({status : "success"})
// })

// app.use((req, res, next) => {
//     console.log("This is middleware 2")
//     return res.send({status : "success"})
// })

// app
//     .route("/api/users")
//     .get((req, res) => {
//         if (req.path == "/fav.ico") { return; }
//         res.send(mock_data)
//     })
//     .post((req, res) => {
//         let body = req.body;
//         mock_data.push({id : mock_data.length+1, ...body})
//         fs.writeFile("./MOCK_DATA.json", JSON.stringify(mock_data), (err)=>{
//             if(err){console.log(err.message)}
//         })
//         console.log(body)
//         return res.json({ status: "success", id : mock_data.length })
//     })

// app
//     .route("/api/users/:id")
//     .get((req, res) => {
//         let id = req.params.id
//         let user = mock_data.find(x => x.id == id)
//         res.send(user)
//     })
//     .patch((req, res) => {
//         let id = req.params.id
//         return res.json( { status: "pending" } )
//     })
//     .delete((req, res) => {
//         let id = req.params.id
//         let obj_index = mock_data.findIndex(x => x.id == id)
//         mock_data.splice(obj_index, 1);
//         fs.writeFile("./MOCK_DATA.json", JSON.stringify(mock_data), (err)=>{
//             if(err){console.log(err.message)}
//         })
//         return res.json( { status: "pending" } )
//     })

// app.listen(3000, () => {
//     console.log("Server Started")
// })

// 🎈 Example 2 : We can make changes in req/res obj

// To create custom middleware
app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    req.username = "Ankit Manjrekar"
    next()
    // return res.send({status : "success"})
})

app.use((req, res, next) => {
    console.log("This is middleware 2")
    console.log(req.username)
    return res.send({ status: "success" })
})

app.get("/api/users", (req, res) => {
    if (req.path == "/fav.ico") { return; }
    res.send(mock_data)
})


app.listen(3000, () => {
    console.log("Server Started")
})













