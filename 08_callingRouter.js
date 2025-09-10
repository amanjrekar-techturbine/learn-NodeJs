let studentRoutes = require("./08_router")
let express = require("express")
let app = express()

app.use(express.json());

app.use("/api/students", studentRoutes)

app.listen(3000, () => {
    console.log("Server Started");
})