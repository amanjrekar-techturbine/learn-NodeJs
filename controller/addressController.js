let Address = require("../model/addressModel");

let handleGetAllReq = async (req, res) => {
    try{
        let addresses = await Address.find();
        return res.json(addresses);
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message);
    }
}

let handlePostReq = async (req, res) => {

    let {street, city, pincode} = req.body;

    try{
        let address = await Address.create({
            street,
            city,
            pincode
        })

        return res.json(address);
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message);
    }
}

let handleGetByIdReq = async (req, res) => {

    let id = req.params.id;

    try{
        let address = await Address.findById(id);

        if(!address){
            return res.status(404).json("Address Not Found");
        }

        return res.json(address);
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message);
    }
}

let handlePatchReq = async (req, res) => {

    let id = req.params.id;
    let body = req.body;

    if(Object.keys(body).length == 0){
        return res.status(400).send("No Fields Found");
    }

    try{
        let address = await Address.findByIdAndUpdate(id, body, {
            new : true,
            runValidators : true
        });

        if(!address){
            return res.status(404).json("Address Not Found");
        }

        return res.json(address);
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message);
    }
}

let handleDeleteReq = async (req, res) => {

    let id = req.params.id;

    try{
        let address = await Address.findByIdAndDelete(id);

        if(!address){
            return res.status(404).json("Address Not Found");
        }

        return res.json(address);
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message);
    }
}

module.exports = {
    handleGetAllReq,
    handlePostReq,
    handleGetByIdReq,
    handlePatchReq,
    handleDeleteReq
}