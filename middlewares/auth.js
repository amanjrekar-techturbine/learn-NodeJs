let { getClientSession } = require("../service/auth");

async function authenticateClient(req, res, next) {

    let sessionId = req.headers["authorization"];
    console.log("In Authentication")

    if (!sessionId || !sessionId.startsWith("Bearer ")) {
        return res.status(400).send("No sessionID found");
    }

    try {
        let client = getClientSession(sessionId.slice(7));

        if (!client) {
            return res.status(400).send("Invalid session ID");
        }

        req.client = client;
        next();
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

function authorizeClient(roles = []){
    return (req, res, next) => {
        if(!req.client){
            return res.status(401).send("You are not authenticated, Please login in");
        }

        if(!roles.includes(req.client.role)){
            return res.status(401).send("You are not authorized");
        }

        next()
    }
}

module.exports = {
    authenticateClient,
    authorizeClient
}