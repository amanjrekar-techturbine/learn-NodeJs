let { authenticateClient, authorizeClient} = require("../middlewares/auth");

let express = require("express");
let { login,
    getAll,
    create,
    getById,
    patch,
    deleteById
} = require("../controller/clientController");
let router = express.Router();

//login
router.post("/login", login);

router
    .route("/")
    .get(authenticateClient, authorizeClient(["ADMIN", "MANAGER"]), getAll)
    .post(create)


router.route("/:id")
    .get(getById)
    .patch(patch)
    .delete(deleteById)


module.exports = router;