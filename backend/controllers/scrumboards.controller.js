const Scrumboard = require('../models/scrumboards.model.js');

// Create and Save a new Scrumboard
exports.create = async (req, res) => {

    if(!req.body.name | !req.body.type) {
        return res.status(400).send({
            message: 'Fields all required.'
        })
    }

    // Create a Scrumboard
    const scrumboard = new Scrumboard({
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        description: req.body.description,
        date: Date.now(),
        creatorId: req.body.creatorId
    });

    scrumboard.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while creating Scrumboard."
        })
    });
};

//  Create new story after Creating Scrumboard
exports.createStory = (req, res) => {
   Scrumboard.findByIdAndUpdate(req.params.scrumboardId)
    .then(scrumboard => {
        const story = scrumboard.stories.id(req.params.storyId);
        story.set(req.body)
    })
    .then(scrumboard => {
        res.send(scrumboard)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Scrumboard with id " + req.params.scrumboardId
        }); 
    });
}

// Retrieve and return all Scrumboard from the database.
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

// Find a single Scrumboard with a ScrumboardId
exports.findOne = (req, res) => {
    Scrumboard.findById(req.params.scrumboardId)
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send(scrumboard);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Scrumboard with id " + req.params.scrumboardId
        });
    });
};

exports.storyFindOne = (req, res) => {
    Scrumboard.findByIdAndUpdate(req.params.storyId)
        .then(story => {
            if(!story) {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send(story)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Scrumboard with id " + req.params.scrumboardId
            });
        });
}


// Update a Scrumboard identified by the scrumboardId in the request
exports.update = (req, res) => {

    // Find Scrumboard and update it with the request body
    Scrumboard.findByIdAndUpdate(req.params.scrumboardId, {
        name: req.body.name,
        key: req.body.key,
        type: req.body.type,
        description: req.body.description,
        date: Date.now(),
        creatorId: req.body.creatorId
    }, {upsert: true})
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send(scrumboard);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error updating Scrumboard with id " + req.params.scrumboardId
        });
    });
};

// Delete a comment with the specified comment in the request
exports.delete = (req, res) => {
    Scrumboard.findByIdAndRemove(req.params.scrumboardId)
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Cannot delete, Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send({message: "Scrumboard deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Could not delete Scrumboard with id " + req.params.scrumboardId
        });
    });
};

// Add member to Scrumboard
exports.addMember = (req, res) => {
    // Find scrumboard and update it
    Scrumboard.findByIdAndUpdate(req.params.scrumboardId, {
        $set: {members: req.body.members}
    })
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send('Add member success !');
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error updating Scrumboard with id " + req.params.scrumboardId
        });
    });


};

// Delete member to Scrumboard
exports.deleteMember = (req, res) => {

   // Find scrumboard and update it
    Scrumboard.findByIdAndUpdate(req.params.scrumboardId, {
        $pull: {members: req.body.members}
    },{new: true})
        .then(scrumboard => {
            if(!scrumboard) {
                return res.status(404).send({
                    message: "Scrumboard not found with id " + req.params.scrumboardId
                });
            }
            res.send('Delete member from scrum');
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Scrumboard not found with id " + req.params.scrumboardId
            });
        }
        return res.status(500).send({
            message: "Error updating Scrumboard with id " + req.params.scrumboardId
        });
    });


};


