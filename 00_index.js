let express = require("express");
let Client = require("./model/clientModel");
let { setClientSession } = require("./service/auth");
let { authenticateClient, authorizeClient } = require("./middlewares/auth");
let { v4 : uuidv4 } = require("uuid"); 
let addressRouter = require("./routes/addressRouter")

let app = express()

app.use(express.json());

// SignUp
app.post("/api/client", async (req, res)=>{

    let {name, username, password, role} = req.body;

    let obj = (role) ? {
            name,
            username,
            password,
            role
        } : {
            name,
            username,
            password
        }

    try {
        
        let client = await Client.create(obj)

        return res.status(201).send(client);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
})

// Login
app.post("/api/client/login", async (req, res)=>{

    let {username, password} = req.body;

    try {
        
        let client = await Client.findOne({username, password});

        if(!client){
            return res.status(404).send("Invalid username or password");
        }


        let token = setClientSession(client);
        return res.send(token);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);
    }
})

// Access Resource
app.get("/api/client", authenticateClient, authorizeClient(["ADMIN"]), async (req, res)=>{
    let clients = await Client.find();
    res.json(clients);
})

app.listen(3000, ()=>{
    console.log("Server Started");
})






























