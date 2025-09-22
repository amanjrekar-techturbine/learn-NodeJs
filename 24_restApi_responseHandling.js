let express = require("express");
let ApiError = require("./utils/apiError");
let ApiResponse = require("./utils/apiResponse");
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

// 🎈 Manually connection
pool.connect()
    .then(client => { console.log("Connected to PostgreSQL"); 
        // Be sure to release the client 
        client.release(); // The connection stays occupied and your app may freeze or crash due to exhausted pool
    }) 
    .catch(err => { console.error("Connection error:", err.message); });

// GET ALL REQUEST
app.get("/api/students", async (req, res) => {
    let query = "SELECT * FROM students";

    try {
        let result = await pool.query(query);
        let response = new ApiResponse(200, result.rows)            // Custom Response
        return res.json(response);
    } catch (err) {
        throw new ApiError(err.status);
    }
})

// GET BY ID
app.get("/api/students/:id", async (req, res, next) => {

    let id = req.params.id;

    let query = "SELECT * FROM students WHERE id=$1";

    try {

        let result = await pool.query(query, [id]);

        if (result.rowCount == 0) {
            throw new ApiError(404, "Student Not Found", )          // Throwing custom errors
        }

        let response = new ApiResponse(200, result.rows);
        return res.status(200).json(response);

    } catch (err) {
        return next(err)
    }


})

// Error Handling
app.use((err, req, res, next) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success : err.success,
            statusCode : err.statusCode,
            message : err.message
        })
    }
})

app.listen(3000, ()=>{
    console.log("Server Started");
})