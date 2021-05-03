const Week = require('../models/agenda.model.js');

// Create and Save a new Agenda
exports.create = async (req, res) => {

    // Create a Agenda
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

// Retrieve and return all Agenda from the database.
exports.findAll = (req, res) => {
    Week.find()
        .then(weeks => {
            res.send(weeks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while creating Agenda."
        });
    });
};

// Find a single Agenda
exports.findOne = (req, res) => {
    Week.findById(req.params.scheduleId)
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Agenda not found with id " + req.params.scheduleId
                });
            }
            res.send(week);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Agenda not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Agenda with id " + req.params.scheduleId
        });
    });
};


// Update a Agenda identified by the agendaId in the request
exports.update = (req, res) => {

    // Find Agenda and update it with the request body
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
    }, {upsert: true})
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Agenda not found with id " + req.params.scheduleId
                });
            }
            res.send(week);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Agenda not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Error updating Agenda with id " + req.params.scheduleId
        });
    });
};

// Delete a Agenda with the specified Agenda in the request
exports.delete = (req, res) => {
    Week.findByIdAndRemove(req.params.scheduleId)
        .then(week => {
            if(!week) {
                return res.status(404).send({
                    message: "Cannot delete, Agenda not found with id " + req.params.scheduleId
                });
            }
            res.send({message: "Agenda deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Agenda not found with id " + req.params.scheduleId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.scheduleId
        });
    });
};


