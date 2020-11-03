const Achievement = require('../models/achievements.model.js');

// Create and Save a new Achievement
exports.create = async (req, res) => {

    // Create a Achievement
    const achievement = new Achievement({
        name: req.body.name,
        message: req.body.message,
        creatorId: req.body.creatorId,
    });

    // Save User in the database
    // TO DO : trop simple, à revoir
    await achievement.save();
    res.json(achievement);
};

// Retrieve and return all Achievement from the database.
exports.findAll = (req, res) => {
    Achievement.find()
        .then(achievements => {
            res.send(achievements);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving achievements."
        });
    });
};

// Find a single Achievement with a Achievement
exports.findOne = (req, res) => {
    Achievement.findById(req.params.achievementId)
        .then(achievement => {
            if(!achievement) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.achievementId
                });
            }
            res.send(achievement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.achievementId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.achievementId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Achievement.findByIdAndUpdate(req.params.achievementId, {
        name: req.body.name,
        message: req.body.message,
        creatorId: req.body.creatorId,
    }, {new: true})
        .then(achievement => {
            if(!achievement) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.achievementId
                });
            }
            res.send(achievement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.achievementId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.achievementId
        });
    });
};

// Delete a Achievement with the specified Achievement in the request
exports.delete = (req, res) => {
    Achievement.findByIdAndRemove(req.params.achievementId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.achievementId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.achievementId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.achievementId
        });
    });
};

