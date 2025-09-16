let express = require("express");
let mongoose = require("mongoose");

let app = express();

app.use(express.json())

// Connection :
mongoose
    .connect("mongodb+srv://amanjrekar_db_user:EgYJM2D8K7XezMag@cluster0.jgbyezp.mongodb.net/crud")
    .then(() => { console.log("MongoDB connected"); })
    .catch((err) => { console.log(err.message) })

// Schema
let studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },
    grade: {
        type: String,
        required: true
    }
}, { timestamps: true })

let Student = mongoose.model("student", studentSchema);

// To Add :
app.post("/api/students/", async (req, res) => {
    let { name, age, grade } = req.body;

    try {
        // createdStudent contains document 
        let createdStudent = await Student.create({         // Student.create() returns promise
            name,
            age,
            grade
        });

        // Another Way :
        // let emp1 = new Student({
        //     name,
        //     age,
        //     grade
        // })

        // emp1.save();

        return res.status(201).send(createdStudent);

    } catch (err) {
        res.status(400).send(err.message);
    }
})

// Get All :
// app.get("/api/students", async (req, res) => {
//     let students = await Student.find();
//     res.json(students);
// });

// Pagination :
app.get("/api/students", async (req, res)=>{
    let pageNo = Number(req.query.pageNo || "1");
    let pageSize = Number(req.query.pageSize || "2");

    let offset = (pageNo - 1) * pageSize;

    try {
        let students = await Student.find().skip(offset).limit(pageSize);
        return res.json(students);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

// Get By ID :
app.get("/api/students/:id", async (req, res) => {
    let id = req.params.id;

    try {
        // student contains moongose document or null(if no document with that _id exists)
        let student = await Student.findById(id);          // Student.findById() returns promise   
        
        if(!student){
            return res.status(404).json("Student Not Found");
        }
        
        res.json(student);
    } catch (err) {
        console.log(err.message);
        res.status(404).send(err.message)
    }

});

// PATCH request :
app.patch("/api/students/:id", async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    if (Object.keys(body).length == 0) {
        return res.status(400).send("Please enter required fields")
    }

    try {
        // updated_student contains udpatedDocument or null(if id is wrong)
        let updated_student = await Student.findByIdAndUpdate(id, body); // It returns promise

        console.log(updated_student);

        if (!updated_student) {
            return res.status(404).json("Student Not Found");
        }

        res.json("Student updated successfully");
    } catch (err) {
        console.log(err.message);
        res.status(404).send(err.message)
    }
})


// DELETE request :
app.delete("/api/students/:id", async (req, res)=>{

    let id = req.params.id;

    try {
        // deletedStudent contains deleted document or null(if no document with that ID exists)
        let deletedStudent = await Student.findByIdAndDelete(id);     // Student.findByIdAndDelete() returns a promise

        console.log(deletedStudent)

        if(!deletedStudent){
            return res.status(404).json("Student Not Found");
        }

        return res.send("Student Deleted Successfully");
    } catch (err) {
        
        return res.status(500).send(err.message);
    }
})

app.listen(3000, () => {
    console.log("Server Started");
})
