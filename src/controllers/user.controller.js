const User = require('../models/user.model.js');

exports.create = (req, res) => {

    // Validate request
    if(!req.body.email) {
        // Empty email
        return res.status(400).send({message : "Email cannot be empty"});
    }

    /*
    if (){
        WIP Check if email exists
    }
    */
   
    if (!req.body.password) {
        // Empty password
        return res.status(400).send({message : "Password cannot be empty"});
    } 
    
    if (typeof(req.body.phoneNumber)!="number"){
        // Phone Number is not a number (probably a string)
        return res.status(400).send({message : "Phone Number has to be a number"});
    }
    
    if (req.body.phoneNumber!=null && req.body.phoneNumber.toString().length!=9){
        // Phone Number is not 9 digits long
        return res.status(400).send({message : "Phone Number has to be a 9 digit number"});
    }

    // Create a User
    const user = new User({
        name: req.body.name || "", 
        surname: req.body.surname || "",
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber || 1,
        registerDate : Date.now()
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.status(200).send({message : "User registered successfully", userId : data._id});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

