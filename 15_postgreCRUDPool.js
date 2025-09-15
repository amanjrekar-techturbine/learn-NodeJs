let express = require("express");
let { Pool } = require("pg");

let app = express();

app.use(express.json());

let pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Tech1mini",
    port: 5433,
    database: "demodb"
})

pool.on("connect", (client)=>{
    console.log("Connection Established")
})

// POST REQUEST
app.post("/api/students", async (req, res) => {
    let { id, name, age, grade } = req.body;

    let query = "INSERT INTO students(id, name, age, grade) VALUES($1, $2, $3, $4)";

    try {
        await pool.query(query, [id, name, age, grade])
        return res.status(201).send("Student added successfully");
    } catch (error) {
        return res.status(500).send(err.message)
    }

})

// GET ALL REQUEST
// app.get("/api/students", async (req, res) => {
//     let query = "SELECT * FROM students";

//     try {
//         let result = await pool.query(query);
//         return res.json(result.rows);
//     } catch (err) {
//         return res.send(err.message)
//     }
// })

// Pagination (Get All)
app.get("/api/students", async (req, res) => {

    let pageNo = parseInt(req.query.pageNo || "1");
    let pageSize = parseInt(req.query.pageSize || "5");

    let offset = (pageNo - 1) * pageSize; 

    // LIMIT 10 → Return 10 records
    // OFFSET 10 → Skip the first 10 records (i.e., page 2)
    let query = `SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2`;

    try {
        let result = await pool.query(query, [pageSize, offset]);
        return res.json(result.rows);
    } catch (err) {
        return res.send(err.message)
    }
})

// GET BY ID
app.get("/api/students/:id", async (req, res) => {

    let id = req.params.id;

    let query = "SELECT * FROM students WHERE id=$1";

    try {

        let result = await pool.query(query, [id]);

        if (result.rowCount == 0) {
            return res.status(404).send("Student Not Found");
        }

        return res.json(result.rows);

    } catch (err) {
        return res.send(err.message);
    }


})

// PUT REQUEST
app.put("/api/students/:id", async (req, res) => {
    let id = req.params.id;
    let { name, age, grade } = req.body;

    if(!name || !age || !grade){
        return res.status(400).send("Please Send All Fields");
    }

    let query = "UPDATE students SET name=$1, age=$2, grade=$3 WHERE id=$4";

    try {

        let result = await pool.query(query, [name, age, grade, id]);

        if (result.rowCount == 0) {
            return res.status(404).send("Student Not Found");
        }

        return res.send("Student Updated Successfully");

    } catch (err) {
        return res.send(err.message);
    }
})

// DELETE REQUEST
app.delete("/api/students/:id", async (req, res) => {
    let id = req.params.id;

    let query = "DELETE FROM students WHERE id=$1";

    try {

        let result = await pool.query(query, [id]);

        if(result.rowCount == 0){
            return res.status(404).send("Student Not Found");
        }

        return res.send("Student Deleted Successfully");

    } catch (err) {
        return res.send(err.message);
    }


});

// PATCH REQUEST
app.patch("/api/students/:id", async (req, res)=>{

    let id = req.params.id;
    let {name, age, grade} = req.body;

    let fields = [];
    let values = [];
    let index = 1;

    if(name){
        fields.push(`name=$${index++}`);
        values.push(name);
    }

    if(age){
        fields.push(`age=$${index++}`);
        values.push(age);
    }

    if(grade){
        fields.push(`grade=$${index++}`);
        values.push(grade);
    }

    values.push(id)

    if(fields.length == 0){
        return res.status(400).send("No fields available");
    }

    let query = `UPDATE students SET ${fields.join(", ")} WHERE id=$${index}`;

    try {
        let result = await con.query(query, values);
        
        if(result.rowCount == 0){
            return res.status(404).send("Student Not Found");
        }

        return res.send("Student Updated Successfully");

    } catch (err) {
        return res.status(500).send(err.message);
    }
    
    

})

app.listen(3000, ()=>{
    console.log("Server Started");
})