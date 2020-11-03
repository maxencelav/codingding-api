const Scrumboard = require('../models/scrumboards.model.js');

// Create and Save a new comment
exports.create = async (req, res) => {

    // Create a comment
    const scrumboard = new Scrumboard({
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        description: req.body.description,
        date: Date.now(),
        creatorId: req.body.creatorId
    });

    // Save User in the database
    // TO DO : trop simple, à revoir

    await scrumboard.save();
    res.json(scrumboard);
};

// Retrieve and return all comment from the database.
exports.findAll = (req, res) => {
   Scrumboard.find()
        .then(scrumboards => {
            res.send(scrumboards);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a comment
exports.findOne = (req, res) => {
    Scrumboard.findById(req.params.scrumboardId)
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.scrumboardId
                });
            }
            res.send(scrumboard);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.scrumboardId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Scrumboard.findByIdAndUpdate(req.params.scrumboardId, {
        text: req.body.text,
        date: Date.now(),
        wishId: req.body.wishId,
        creatorId: req.body.creatorId
    }, {new: true})
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.scrumboardId
                });
            }
            res.send(scrumboard);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.scrumboardId
        });
    });
};

// Delete a comment with the specified comment in the request
exports.delete = (req, res) => {
    Scrumboard.findByIdAndRemove(req.params.scrumboardId)
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.scrumboardId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.scrumboardId
        });
    });
};


