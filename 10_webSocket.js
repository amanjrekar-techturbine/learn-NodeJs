let express = require("express");
let http = require("http");
let path = require("path");
let { Server } = require("socket.io");

let app = express();                // Handler function

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
})

let httpServer = http.createServer(app);                
let io = new Server(httpServer);                        // HTTP server can handle both HTTP (Express) and WebSocket (Socket.IO) traffic.

io.on("connection", (socket) => {
    console.log("A user connected : " + socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("user-msg", (msg) => {
        console.log("Client Message : " + msg);
        // socket.broadcast.emit("chat-msg", msg);      // it sends a message to all other connected clients, except that one socket that just sent msg.
        io.emit("chat-msg", {id : socket.id, msg})                        // Sends message to everyone
    })
})

httpServer.listen(3000, () => {
    console.log("Server Started");
})













