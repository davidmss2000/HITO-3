const User = require('../models/user.model.js');

function create (req, res) {
    // Create the User
    const user = new User(req.body);

    // Save User in the database
    user.save().then(obj => {
        return res.status(200).send({message : "User registered successfully", obj});
    }).catch(err => {
        return res.status(500).send({message : err});
    });
};

function getInfoById (req, res) {

    User.findOne({_id: req.params.userId}).then(obj => {
        if(obj==null){
            // Doesn't exist
            return res.status(404).send({message : "That user doesn't exists"});
        }else{
            // Send name, email and registration date
            return res.status(200).send(obj);
        }
    }).catch(() => {
        return res.status(404).send({message : "That user doesn't exists"});
    });
};

function updateById (req, res) {

    // Update user
    User.updateOne({_id: req.params.userId}, req.body).then((obj) => {
        return res.status(200).send({message : "User updated successfully", obj});
    }).catch((err) => {
        return res.status(500).send({message : "There was an error processing your request", err});
    });

};

function deleteById (req, res) {

    User.findOneAndDelete({_id: req.params.userId}).then(obj => {
        if(obj==null){
            // Doesn't exist
            return res.status(400).send({message : "That user doesn't exists"});
        }else{
            return res.status(200).send({message : "User deleted successfully"});
        }
    }).catch(err => {
        return res.status(400).send({message : err || "That user doesn't exists"});
    });
};

module.exports = {
    create,
    getInfoById,
    updateById,
    deleteById,
};
