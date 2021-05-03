const Task = require('../models/tasks.model.js');

// Create and Save a new Task
exports.create = async (req, res) => {

    if(!req.body.name | !req.body.type) {
        return res.status(400).send({
            message: 'Fields all required.'
        })
    }

    // Create a Task
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
            message: err.message || "Error while creating Task."
        })
    });
};

// Retrieve and return all Task from the database.
exports.findAll = (req, res) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tasks."
        });
    });
};

// Find a single Task with a Task
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Task with id " + req.params.taskId
        });
    });
};


// Update a Task identified by the taskId in the request
exports.update = (req, res) => {

    // Find Task and update it with the request body
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
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId
        });
    });
};

// Delete a Task with the specified Task in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Cannot delete, Task not found with id " + req.params.taskId
                });
            }
            res.send({message: "Task deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete Task with id " + req.params.taskId
        });
    });
};


