let express = require("express");
let router = express.Router()

router
    .route("/")
    .get((req, res)=>{
        res.send("This is a get all route");
    })
    .post((req, res)=>{
        res.send("This is a post route");
    })

router
    .route("/:id")
    .get((req, res)=>{
        res.send("This is a get by id route");
    })
    .put((req, res)=>{
        res.send("This is a PUT route");
    })
    .delete((req, res)=>{
        res.send("This is a DELETE route");
    })

module.exports = router