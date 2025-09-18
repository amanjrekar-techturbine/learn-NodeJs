let path = require("path");
let fs = require("fs");
let zlib = require("zlib");

// 🎈 Readable Stream
// let readable_stream = fs.createReadStream("./50mb.txt", "utf-8");

// readable_stream.on("data", (chunk) => {
//     console.log("Chunk Received : " + chunk);
// })

// readable_stream.on("end", () => {
//     console.log("Finished reading file");
// })

// readable_stream.on("error", (error) => {
//     console.log("Error occured : " + error.message);
// })

// 🎈 Writable Stream
// let readable_stream = fs.createReadStream("./50mb.txt", "utf-8");

// let writable_stream = fs.createWriteStream("./output.txt");

// readable_stream.pipe(writable_stream);

// writable_stream.on("finish", ()=>{
//     console.log("Write Process is finished")
// })

// 🎈 Transform Stream
// fs.createReadStream("./50mb.txt").pipe(zlib.createGzip()).pipe(fs.createWriteStream("./50mb.zip"))