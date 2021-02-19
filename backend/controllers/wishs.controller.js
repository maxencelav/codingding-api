const Wish = require('../models/wishs.model.js');

// Create and Save a new Achievement
exports.create = async (req, res) => {

    if(!req.body.name | !req.body.type) {
        return res.status(400).send({
            message: 'Fields all required.'
        })
    }

    // Create a Achievement
    const wish = new Wish({
        name: req.body.name,
        date: Date.now(),
        type: req.body.type,
        creatorId: req.body.creatorId
    });

    wish.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while creating Wish."
        })
    });
};

// Retrieve and return all Achievement from the database.
exports.findAll = (req, res) => {
    Wish.find()
        .then(wishs => {
            res.send(wishs);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving achievements."
        });
    });
};

// Find a single Achievement with a Achievement
exports.findOne = (req, res) => {
    Wish.findById(req.params.wishId)
        .then(achievement => {
            if(!achievement) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.wishId
                });
            }
            res.send(achievement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.wishId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.wishId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Wish.findByIdAndUpdate(req.params.wishId, {
        name: req.body.name,
        date: Date.now(),
        type: req.body.type,
        creatorId: req.body.creatorId
    }, {upsert: true})
        .then(achievement => {
            if(!achievement) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.wishId
                });
            }
            res.send(achievement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.wishId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.wishId
        });
    });
};

// Delete a Achievement with the specified Achievement in the request
exports.delete = (req, res) => {
    Wish.findByIdAndRemove(req.params.wishId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.wishId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.wishId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.wishId
        });
    });
};


