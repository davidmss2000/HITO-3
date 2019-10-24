const User = require('../models/user.model.js');

exports.create = (req, res) => {

    var somethingWentWrong = false;
    // Validate request
    if(!req.body.email) {
        // Empty email
        res.status(400).send({message : "Email cannot be empty"});
        return;
    }

    if (!req.body.password) {
        // Empty password
        res.status(400).send({message : "Password cannot be empty"});
        return;
    } 

    if (req.body.phoneNumber!=null && req.body.phoneNumber.length!=9 || new RegExp("[0-9]{9}").test(req.body.phoneNumber) == false){
        // Incorrect Phone Number
        res.status(400).send({message : "Phone Number has to be a 9 digit number"});
        return;
    }

    User.findOne({email: req.body.email}).exec().then(obj =>{
        if (obj!=null){
            // That email exists in the database
            res.status(400).send({message : "That email already exists"});
            return;
        }else{
            // Create the User
            const user = new User({
                name: req.body.name || "", 
                surname: req.body.surname || "",
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber || 1,
                registerDate : Date.now()
            });

            // Save User in the database
            user.save().then(data=>{
                res.status(200).send({message : "User registered successfully", userId : data._id});
            }).catch(err=>{
                res.status(500).send({message : err.message || "There was an error processing your request"});
            });
        }
    })
};

exports.getUserInfo = (req, res) => {

    var result = User.findById(req.params.userId).then(test => {
        console.log(test);
    });

    res.status = 400;
    res.message = "va mal";

    res.send();
};