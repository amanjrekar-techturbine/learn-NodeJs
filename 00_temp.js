let express = require("express");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let app = express();
app.use(express.json());
let secret_key = "$oi98plw$_"

// Connection
mongoose
    .connect("mongodb+srv://amanjrekar_db_user:EgYJM2D8K7XezMag@cluster0.jgbyezp.mongodb.net/crud")
    .then(() => { console.log("MongoDB Connected") })
    .catch((err) => { console.log(err.message) })

let clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "VISITOR",
        enum: ["VISITOR", "USER", "MANAGER", "ADMIN"]
    }
}, { timestamps: true })

let Client = mongoose.model("client", clientSchema)

// Routes

app.get("/api/clients/", async (req, res) => {

    // authentication
    let token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
        res.status(400).json({ msg: "Invalid token" })
    }

    token = token.slice(7);

    try {
        let clientInfoFromJWT = jwt.verify(token, secret_key);

        //authorization
        if(!["ADMIN", "MANAGER"].includes(clientInfoFromJWT.role)){
            return res.status(401).json({ msg: "Unauthorized Client" });
        }

        let clients = await Client.find();
        return res.json(clients);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }



})

app.post("/api/clients/", async (req, res) => {
    let { name, username, password, role } = req.body;

    let clientToInsert = (role) ? { name, username, password, role } : { name, username, password }

    try {
        let clientInserted = await Client.create(clientToInsert);

        return res.status(201).json(clientInserted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
})

app.post("/api/clients/login", async (req, res) => {
    let { username, password } = req.body;

    try {
        let client = await Client.findOne({ username, password });

        if (!client) {
            res.status(404).json({ msg: "Client Not Found" })
        }

        let token = jwt.sign({ username: client.username, role: client.role }, secret_key);

        return res.json({ jwt: token, ...client["_doc"] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }

})


app.listen(3000, ()=>{
    console.log("Server Started");
})