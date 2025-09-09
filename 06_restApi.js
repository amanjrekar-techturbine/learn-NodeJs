let express = require("express");
let mock_data = require("./MOCK_DATA.json")
let app = express();


// 🎈 Example 1 : Implementation

// // Get all users
// app.get("/api/users", (req, res)=>{
//     if(req.path == "/fav.ico"){ return; }
//     res.send(mock_data)
// })


// // Get all users (Server side rendering)
// app.get("/users", (req, res)=>{
//     let temp = `
//         <table>
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>FIRST NAME</th>
//                     <th>LAST NAME</th>
//                     <th>EMAIL</th>
//                     <th>GENDER</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${mock_data.map((x)=>{
//                     return `
//                         <tr>
//                             <td>${x.id}</td>
//                             <td>${x.first_name}</td>
//                             <td>${x.last_name}</td>
//                             <td>${x.email}</td>
//                             <td>${x.gender}</td>
//                         </tr>
//                     `;
//                 }).join("")}
//             </tbody>
//         </table>
//     `

//     res.send(temp)
// })

// // Get user by ID
// app.get("/api/users/:id", (req, res) => {
//     let id = req.params.id
//     let user = mock_data.find(x => x.id == id)
//     res.send(user)
// })

// // Add a user
// app.post("/api/users", (req, res)=>{
//     return res.json( { status : "pending" } )
// })

// // Update user by ID
// app.patch("/api/users/:id", (req, res)=>{
//     let id = req.params.id
//     return res.json( { status : "pending" } )
// })

// // Delete user by ID
// app.delete("/api/users/:id", (req, res)=>{
//     let id = req.params.id
//     return res.json( { status : "pending" } )
// })

// app.listen(3000, ()=>{
//     console.log("Server Started")
// })

// 🎈 Example 2 : Grouping routes of same URL

// Get all users (Server side rendering)
app.get("/users", (req, res) => {
    let temp = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>GENDER</th>
                </tr>
            </thead>
            <tbody>
                ${mock_data.map((x) => {
        return `
                        <tr>
                            <td>${x.id}</td>
                            <td>${x.first_name}</td>
                            <td>${x.last_name}</td>
                            <td>${x.email}</td>
                            <td>${x.gender}</td>
                        </tr>
                    `;
    }).join("")}
            </tbody>
        </table>
    `

    res.send(temp)
})

// ✅ app.route() returns a Route object — not a middleware, not a router.
// This Route object allows you to chain HTTP method handlers (like .get(), .post(), etc.) for a single path.

app
    .route("/api/users")
    .get((req, res) => {
        if (req.path == "/fav.ico") { return; }
        res.send(mock_data)
    })
    .post((req, res) => {
        return res.json({ status: "pending" })
    })

app
    .route("/api/users/:id")
    .get((req, res) => {
        let id = req.params.id
        let user = mock_data.find(x => x.id == id)
        res.send(user)
    })
    .patch((req, res) => {
        let id = req.params.id
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        let id = req.params.id
        return res.json({ status: "pending" })
    })

app.listen(3000, () => {
    console.log("Server Started")
})













