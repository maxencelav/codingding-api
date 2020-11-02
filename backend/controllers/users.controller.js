const User = require('../models/users.model.js');

// Create and Save a new User
exports.create = (req, res) => {

    // Get variables from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.userId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};


