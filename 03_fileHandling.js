let fs = require('fs')

// 🎈 Example 1 : Writing a File / Creating a file

// Synchronous Call
// fs.writeFileSync("./text.txt", "Hello World 123")

// Asynchronous Call
// fs.writeFile("./text.txt", "Async Hello World", (err) => {          // Callback Fn runs when execution is completed
//     if (err) {
//         console.error('Error writing file:', err);
//         return;
//     }
//     console.log('File written successfully.');
// })

// 🎈 Example 2 : Reading a File

// Synchronous Call
// let fileData = fs.readFileSync("text.txt", "utf-8")
// console.log(fileData)

// Async Call
// fs.readFile("text.txt", "utf-8", (err, data)=>{
//     if(err){
//         console.log("Error : " + err)
//     }else{
//         console.log(data)
//     }
// })

// ‼️ Note that readFile() returns undefined

// 🎈 Example 3 : Append content in File

// Sync Call
// fs.appendFileSync("./text.txt", "\n This is a new line.")

// Async Call
// fs.appendFile("./text.txt", "\n This is a new async line.", (err) => {        
//     if (err) {
//         console.error('Error writing file:', err);
//         return;
//     }
// })

// ‼️ If file doesnot exists, new file is created

// 🎈 Example 4 : Copy a file to another file

// Sync Call
// fs.copyFileSync("text.txt", "destination.txt")

// Async Call
// fs.copyFile("./00_temp.js", "./destination.txt", (err) => {
//     if (err) {
//         console.error('Error copying file:', err);
//         return;
//     }
// })

// 🎈 Example 5 : Delete a file

// Sync Call
// fs.unlinkSync("destination.txt")

// Async Call
// fs.unlink("destination.txt", (err) => {
//     if (err) {
//         console.error('Error deleting file:', err.message);
//         return;
//     }
// })

// 🎈 Example 6 : Get Info of the file

// Sync Call
// let info = fs.statSync("./package.json");
// console.log(info);                           // Returns obj   
// console.log(info.isFile());                  // Returns boolean
// console.log(info.isDirectory());             // Returns boolean
// console.log(info.size);                      // Returns bytes
// console.log('Created on:', info.birthtime);

// Async Call
// fs.stat("./package.json", (err, stats) => {
//     if (err) {
//         console.error(err.message);
//         return;
//     }

//     console.log(stats)
// })

// 🎈 Example 7 : Create a directory

// Sync Call
// fs.mkdirSync("new_dir")                     // ‼️ Throws error if directory already exists

// Async Call
// fs.mkdir("new_dir", (err)=>{
//     if (err) {
//         console.error(err.message);
//         return;
//     }
// })











