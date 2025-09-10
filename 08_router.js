const express = require('express');
let fs = require("fs")
let students = require("./students.json");
const router = express.Router();

router.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n${Date.now()} : ${req.method} ${req.path}`, (err)=>{
        (err) ? console.log(err) : null;
    })
    next();
})

router
    .route("/")
    .get((req, res) => {
        // Gets All Students
        return res.json(students);
    })
    .post((req, res) => {
        // Adds Student
        let student = { id: Date.now(), ...req.body }

        students.push(student)

        fs.writeFile("students.json", JSON.stringify(students), (err) => {
            err ? console.log(err) : null;
        })

        return res.json({ status: "success", id: student.id })
    })


router
    .route("/:id")
    .get((req, res) => {
        // Get Student By ID
        let id = req.params.id

        let student = students.find(x => x.id == id);

        if (student) {
            return res.json(student)
        } else {
            return res.json({ status: 404, message: "Student Not Found" })
        }
    })
    .patch((req, res) => {
        // Update Student By ID 
        let id = req.params.id

        let new_student = req.body

        let student_index;
        let student = students.find((x, i) => {
            if (x.id == id) {
                student_index = i
                return true
            }
        });

        if (!student) {
            return res.json({ status: 404, message: "Student Not Found" })
        }

        if (new_student.name) {
            student.name = new_student.name
        }
        if (new_student.age) {
            student.age = new_student.age
        }
        if (new_student.grade) {
            student.grade = new_student.grade
        }

        students.splice(student_index, 1, student)

        fs.writeFile("students.json", JSON.stringify(students), (err) => {
            err ? console.log(err) : null;
        })

        return res.json(student)
    })
    .delete((req, res) => {
        // Delete Student By ID
        let id = req.params.id

        let student_index = students.findIndex(x => x.id == id);

        if (student_index < 0) {
            return res.json({ status: 404, message: "Student Not Found" })
        }

        students.splice(student_index, 1);

        fs.writeFile("students.json", JSON.stringify(students), (err) => {
            err ? console.log(err) : null;
        })

        return res.json({ status: 200, message: "Student Deleted Successfully" })
    })

module.exports = router;