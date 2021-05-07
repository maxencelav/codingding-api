const Story = require('../models/stories.model.js');

// Create and Save a new story
exports.create = async (req, res) => {

    if(!req.body.name) {
        return res.status(400).send({
            message: 'Name required.'
        })
    }

    // Create a story
    const story = new Story({
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        storyPts: req.body.storyPts,
        description: req.body.description,
        priority: req.body.priority,
        date: Date.now(),
        boardId: req.body.boardId,
        creatorId: req.body.creatorId,
        status: 0
    });

    story.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while creating story."
        })
    });
};

// Retrieve and return all story from the database.
exports.findAll = (req, res) => {
    Story.find()
        .then(stories => {
            res.send(stories);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving storys."
        });
    });
};

// Find a single story with a story
exports.findOne = (req, res) => {
    Story.findById(req.params.storyId)
        .then(story => {
            if(!story) {
                return res.status(404).send({
                    message: "story not found with id " + req.params.storyId
                });
            }
            res.send(story);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "story not found with id " + req.params.storyId
            });
        }
        return res.status(500).send({
            message: "Error retrieving story with id " + req.params.storyId
        });
    });
};


// Update a story identified by the storyId in the request
exports.update = (req, res) => {

    // Find story and update it with the request body
    Story.findByIdAndUpdate(req.params.storyId, {
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        storyPts: req.body.storyPts,
        description: req.body.description,
        priority: req.body.priority,
        date: Date.now(),
        boardId: req.body.boardId,
        creatorId: req.body.creatorId,
        status: req.body.status
    }, {upsert: true})
        .then(story => {
            if(!story) {
                return res.status(404).send({
                    message: "story not found with id " + req.params.storyId
                });
            }
            res.send(story);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "story not found with id " + req.params.storyId
            });
        }
        return res.status(500).send({
            message: "Error updating story with id " + req.params.storyId
        });
    });
};

// Delete a story with the specified story in the request
exports.delete = (req, res) => {
    Story.findByIdAndRemove(req.params.storyId)
        .then(story => {
            if(!story) {
                return res.status(404).send({
                    message: "Cannot delete, story not found with id " + req.params.storyId
                });
            }
            res.send({message: "story deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "story not found with id " + req.params.storyId
            });
        }
        return res.status(500).send({
            message: "Could not delete story with id " + req.params.storyId
        });
    });
};

exports.findAllFromScrum = (req, res) => {
    Story.find({"boardId": req.params.boardId})
        .then(stories => {
            res.send(stories);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving storys."
        });
    });
};

// Update a story identified by the storyId in the request
exports.updateDrag = (req, res) => {

    // Find story and update it with the request body
    Story.findByIdAndUpdate(req.params.storyId, {
        status: req.body.status
    })
        .then(story => {
            if(!story) {
                return res.status(404).send({
                    message: "story not found with id " + req.params.storyId
                });
            }
            res.send(story);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "story not found with id " + req.params.storyId
            });
        }
        return res.status(500).send({
            message: "Error updating story with id " + req.params.storyId
        });
    });
};