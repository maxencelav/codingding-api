const Task = require('../models/tasks.model.js');

// Create and Save a new Achievement
exports.create = async (req, res) => {

    if(!req.body.name | !req.body.type) {
        return res.status(400).send({
            message: 'Fields all required.'
        })
    }

    // Create a Achievement
    const task = new Task({
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        storyPts: req.body.storyPts,
        description: req.body.description,
        priority: req.body.priority,
        date: Date.now(),
        boardId: req.body.boardId,
        creatorId: req.body.creatorId
    });

    task.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while creating User."
        })
    });
};

// Retrieve and return all Achievement from the database.
exports.findAll = (req, res) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving achievements."
        });
    });
};

// Find a single Achievement with a Achievement
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(achievement => {
            if(!achievement) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.taskId
                });
            }
            res.send(achievement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.taskId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        storyPts: req.body.storyPts,
        description: req.body.description,
        priority: req.body.priority,
        date: Date.now(),
        boardId: req.body.boardId,
        creatorId: req.body.creatorId
    }, {upsert: true})
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.taskId
        });
    });
};

// Delete a Achievement with the specified Achievement in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.taskId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.taskId
        });
    });
};


