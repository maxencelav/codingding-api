const Week = require('../models/agenda.model.js');

// Create and Save a new Achievement
exports.create = async (req, res) => {

    // Create a Achievement
    const week = new Week({
        weekNumber: req.body.weekNumber,
        classL1TP: req.body.classL1TP,
        profL1TP: req.body.profL1TP,
        classL1ALT: req.body.classL1ALT,
        profL1ALT: req.body.profL1ALT,
        classL2: req.body.classL2,
        profL2: req.body.profL2,
        classL3: req.body.classL3,
        profL3: req.body.profL3,
    });

    // Save User in the database
    // TO DO : trop simple, à revoir
    await week.save();
    res.json(week);
};

// Retrieve and return all Achievement from the database.
exports.findAll = (req, res) => {
    Week.find()
        .then(weeks => {
            res.send(weeks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving achievements."
        });
    });
};

// Find a single Achievement with a Achievement
exports.findOne = (req, res) => {
    Week.findById(req.params.scheduleId)
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.scheduleId
                });
            }
            res.send(week);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.scheduleId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Week.findByIdAndUpdate(req.params.taskId, {
        weekNumber: req.body.weekNumber,
        classL1TP: req.body.classL1TP,
        profL1TP: req.body.profL1TP,
        classL1ALT: req.body.classL1ALT,
        profL1ALT: req.body.profL1ALT,
        classL2: req.body.classL2,
        profL2: req.body.profL2,
        classL3: req.body.classL3,
        profL3: req.body.profL3,
    }, {new: true})
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.scheduleId
                });
            }
            res.send(week);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.scheduleId
        });
    });
};

// Delete a Achievement with the specified Achievement in the request
exports.delete = (req, res) => {
    Week.findByIdAndRemove(req.params.scheduleId)
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.scheduleId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.scheduleId
        });
    });
};


