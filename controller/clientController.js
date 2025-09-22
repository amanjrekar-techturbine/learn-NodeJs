let {setClientSession} = require("../service/auth")
let Client = require("../model/clientModel")

let login = async (req, res) => {

    let body = req.body;
    console.log(body)

    try {

        let client = await Client.findOne(body);

        if (!client) {
            res.status(404).json({ "msg": "Invalid username or password" })
        }

        let token = setClientSession(client);

        return res.json({ jwt: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

}

let getAll = async (req, res) => {

    try {
        let clients = await Client.find();
        res.json(clients);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }

}

let create = async (req, res) => {
    let { name, username, password, role } = req.body;

    let obj = (role) ? { name, username, password, role } : { name, username, password }

    try {

        let result = await Client.create(obj);

        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

}

let getById = async (req, res) => {
    let id = req.params.id;

    try {

        let client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ "msg": "Client not found" });
        }

        return res.json(client);

    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

}

let patch = async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    try {

        let client = await Client.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (!client) {
            return res.status(404).json({ "msg": "Client not found" });
        }

        return res.json(client);

    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

}

let deleteById = async (req, res) => {
    let id = req.params.id;

    try {

        let client = await Client.findByIdAndDelete(id);

        if (!client) {
            return res.status(404).json({ "msg": "Client not found" });
        }

        return res.json(client);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": error.message });
    }

}

module.exports = {
    login,
    getAll,
    create,
    getById,
    patch,
    deleteById
}