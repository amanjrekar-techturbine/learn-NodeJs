let express = require("express");
let userController = require("../controller/userController");
let router = express.Router();

router
    .route("/")
    .get(userController.getAllStudents)

module.exports = router;