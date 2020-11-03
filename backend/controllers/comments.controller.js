const Comment = require('../models/comments.model.js');

// Create and Save a new comment
exports.create = async (req, res) => {

    // Create a comment
    const comment = new Comment({
        text: req.body.text,
        date: Date.now(),
        wishId: req.body.wishId,
        creatorId: req.body.creatorId
    });

    // Save User in the database
    // TO DO : trop simple, à revoir
    await comment.save();
    res.json(comment);
};

// Retrieve and return all comment from the database.
exports.findAll = (req, res) => {
    Comment.find()
        .then(comments => {
            res.send(comments);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a comment
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId)
        .then(comment => {
            if(!comment) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.commentId
                });
            }
            res.send(comment);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.commentId
            });
        }
        return res.status(500).send({
            message: "Error retrieving success with id " + req.params.commentId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Comment.findByIdAndUpdate(req.params.commentId, {
        text: req.body.text,
        date: Date.now(),
        wishId: req.body.wishId,
        creatorId: req.body.creatorId
    }, {new: true})
        .then(comment => {
            if(!comment) {
                return res.status(404).send({
                    message: "Success not found with id " + req.params.commentId
                });
            }
            res.send(comment);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Success not found with id " + req.params.commentId
            });
        }
        return res.status(500).send({
            message: "Error updating Success with id " + req.params.commentId
        });
    });
};

// Delete a comment with the specified comment in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Cannot delete, User not found with id " + req.params.commentId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.commentId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.commentId
        });
    });
};


