let express = require("express");
let fs = require("fs");
let status = require("express-status-monitor");
let zlib = require("zlib");
let app = express();

app.use(status())


// Show file Data to browser
app.get("/", (req, res) => {

    // Without Stream
    // fs.readFile("./50mb.txt", ("utf-8"), (err, data)=>{
    //     if(err){
    //         console.log(err.message);
    //         return res.send(err.message);
    //     }

    //     return res.send(data)
    // })

    // With Stream
    let stream = fs.createReadStream("./50mb.txt", "utf-8");

    stream.on("data", (chunk)=>{
        res.write(chunk);
    })

    stream.on("end", () => res.end());
})

// Zip File using streams
app.get("/zip", (req ,res)=>{
    fs.createReadStream("./50mb.txt").pipe(zlib.createGzip()).pipe(fs.createWriteStream("./50mb.zip"))

    res.end("Closed")
})

app.listen(3000, () => {
    console.log("Server Started");
})