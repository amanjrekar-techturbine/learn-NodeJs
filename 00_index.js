require("dotenv").config()
let express = require("express");
let jwt = require("jsonwebtoken");
let cookieParser = require("cookie-parser");
let mongoose = require("mongoose");
let app = express();
let secret_key = process.env.SECRET_KEY;


app.use(express.json());
app.use(cookieParser());

mongoose
    .connect("mongodb+srv://amanjrekar_db_user:EgYJM2D8K7XezMag@cluster0.jgbyezp.mongodb.net/crud")
    .then(() => { console.log("MongoDB connection established"); })
    .catch((err) => console.log(err.message))

let clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "MANAGER", "USER", "VISITOR"],
        default: "VISITOR"
    }
}, { timestamps: true })

let Client = mongoose.model("client", clientSchema);

// Authentication
function createJwt(payload) {
    return jwt.sign(payload, secret_key);
}

function verifyToken(token) {
    return jwt.verify(token, secret_key);
}

function authenticationMiddleware(req, res, next) {
    let tokenHeader = req.headers["authorization"];

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        return res.status(400).json({ "msg": "JWT token not found in header" })
    }

    let token = tokenHeader.slice(7)

    try {
        let user = verifyToken(token);
        console.log(user)

        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

function authorizationMiddleware(roles = []) {

    return (req, res, next) => {

        if (!req.user) {
            res.status(400).json({ "msg": "Please login" })
        }

        let user = req.user

        if (!roles.includes(user.role)) {
            return res.status(403).json({ "msg": "You are not allowed" })
        }

        next();
    }
}

app.get("/api/clients/paginated", authenticationMiddleware, async (req, res) => {

    let pageNo = Number(req.query.pageNo || "1")
    let pageSize = Number(req.query.pageSize || "3")
    let offset = (pageNo - 1) * pageSize

    try {

        let client = await Client.find().skip(Number(offset)).limit(Number(pageSize));

        return res.json(client);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

})

app.post("/api/clients/login", async (req, res) => {

    let body = req.body;

    try {

        let client = await Client.findOne(body);

        if (!client) {
            res.status(404).json({ "msg": "Invalid username or password" })
        }

        let token = createJwt({ username: client.username, role: client.role });

        return res.json({ jwt: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

})

app
    .route("/api/clients")
    .get(authenticationMiddleware, authorizationMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {

        try {
            let clients = await Client.find();
            res.json(clients);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
        }
    })
    .post(async (req, res) => {
        let { name, username, password, role } = req.body;

        let obj = (role) ? { name, username, password, role } : { name, username, password }

        try {

            let result = await Client.create(obj);

            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": error.message });
        }

    })

app.route("/api/clients/:id")
    .get(async (req, res) => {
        let id = req.params.id;

        try {

            let client = await Client.findById(id);

            if (!client) {
                return res.status(404).json({ "msg": "Client not found" });
            }

            return res.json(client);

        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": error.message });
        }

    })
    .patch(async (req, res) => {
        let id = req.params.id;
        let body = req.body;

        try {

            let client = await Client.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            });

            if (!client) {
                return res.status(404).json({ "msg": "Client not found" });
            }

            return res.json(client);

        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": error.message });
        }

    })
    .delete(async (req, res) => {
        let id = req.params.id;

        try {

            let client = await Client.findByIdAndDelete(id);

            if (!client) {
                return res.status(404).json({ "msg": "Client not found" });
            }

            return res.json(client);
        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": error.message });
        }

    })



app.listen(3000, () => {
    console.log("Server started");
})