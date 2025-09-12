let express = require("express");
let { Server } = require("socket.io");
let http = require("http");
let path = require("path");

let app = express();

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res)=>{
    res.sendFile(path.resolve("./public/index.html"))
});

let myServer = http.createServer(app);
let io = new Server(myServer);

io.on("connection", (socket)=>{
    console.log("New user has connected Server : " + socket.id);

    socket.on("joinRoom", (roomName, username)=>{
        socket.join(roomName);

        console.log(`${username} joined the room : ` + roomName);
    })

    socket.on("chatMessage", (msg, roomName, username)=>{
        console.log("user msg : " + msg)


        io.to(roomName).emit("serverMsg", msg, username);
    })


    socket.on("disconnect", ()=>{
        console.log(socket.id + " Disconnected")
    })
    
})

myServer.listen(3000, ()=>{
    console.log("Server Started")
})
