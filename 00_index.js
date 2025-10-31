require("dotenv").config();
let express = require("express");
let { Pool } = require("pg");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let app = express();

app.use(express.json());

let pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Tech1mini",
    port: 5433,
    database: "demodb"
})


// 🎈 Manually connection
pool.connect()
    .then(client => { console.log("Connected to PostgreSQL"); 
        // Be sure to release the client 
        client.release(); // The connection stays occupied and your app may freeze or crash due to exhausted pool
    }) 
    .catch(err => { console.error("Connection error:", err.message); });

// Login Request
app.post("/api/users/login", async (req, res) => {
    let { email, password } = req.body;

    let query = "SELECT * FROM USERS WHERE email=$1";

    try {
        let user = await pool.query(query, [email]);

        if(user.rowCount ===0){
            return res.status(404).send("User not found");
        }

        let isPasswordValid = await bcrypt.compare(password, user.rows[0].password)

        if(!isPasswordValid){
            return res.status(400).send("Invalid Password");
        }

        let accessToken = jwt.sign()

        return res.status(201).send("Student added successfully");
    } catch (error) {
        return res.status(500).send(err.message);
    }

})

// POST REQUEST
app.post("/api/students", async (req, res) => {
    let { id, name, age, grade } = req.body;

    let query = "INSERT INTO students(id, name, age, grade) VALUES($1, $2, $3, $4)";

    try {
        await pool.query(query, [id, name, age, grade])             // Returns pormise with result object(rowCount, rows, command)
        return res.status(201).send("Student added successfully");
    } catch (error) {
        return res.status(500).send(err.message)
    }

})

// GET ALL REQUEST
app.get("/api/students", async (req, res) => {
    let query = "SELECT * FROM students";

    try {
        let result = await pool.query(query);
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

    let query = "UPDATE students SET name=$1, age=$2, grade=$3 WHERE id=$4 RETURNING *";

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

    let query = "DELETE FROM students WHERE id=$1 RETURNING *";

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