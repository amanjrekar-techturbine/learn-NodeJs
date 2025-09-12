let userModel = require("../model/userModel");

function getAllStudents(req, res){
    let students = userModel.getAllStudents()
    res.render("user", {students});
}

module.exports = {
    getAllStudents
}

