let express = require("express");
let { 
    handleGetAllReq,
    handlePostReq,
    handleGetByIdReq,
    handlePatchReq,
    handleDeleteReq
} = require("../controller/addressController")

let router = express.Router();

router
    .route("/")
    .get(handleGetAllReq)
    .post(handlePostReq)

router
    .route("/:id")
    .get(handleGetByIdReq)
    .patch(handlePatchReq)
    .delete(handleDeleteReq)

module.exports = router;