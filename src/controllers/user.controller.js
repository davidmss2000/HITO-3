const User = require('../models/user.model.js');

exports.create = (req, res) => {

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
                phoneNumber: req.body.phoneNumber || "",
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

    User.findOne({_id : req.params.userId}).exec().then(obj => {
        if(obj==null){
            // Doesn't exist
            res.status(400).send({message : "That user doesn't exists"});
            return;
        }else{
            // Send name email and registration date
            res.status(200).send({name:obj.name, email:obj.email, registerDate:obj.registerDate});
            return;
        }
    }).catch(err=>{
        res.status(400).send({message : "That user doesn't exists"});
        return;
    });
};

exports.update = (req, res) => {

    User.findOne({_id : req.params.userId}).exec().then(obj => {
        if(obj==null){
            // Doesn't exist
            res.status(400).send({message : "That user doesn't exists"});
            return;
        }else{
            // Check password
            if (obj.password != req.body.password){
                // Wrong password
                res.status(200).send({message : "Wrong password"});
                return;
            }
            else{
                // Password match

                // Create the updated User
                var user = {
                    name: req.body.name || obj.name, 
                    surname: req.body.surname || obj.surname,
                    email: req.body.email || obj.email,
                    password: obj.password,
                    phoneNumber: req.body.phoneNumber || obj.phoneNumber,
                    registerDate : obj.registerDate
                };

                // Update user
                User.updateOne({_id : req.params.userId}, user).exec().then(response=>{
                    res.status(200).send({message : "User updated successfully"});
                    return;
                });
            }
            
        }
    }).catch(err=>{
        res.status(400).send({message : err || "That user doesn't exists"});
        return;
    });
};