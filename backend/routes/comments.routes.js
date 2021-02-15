module.exports = (app) => {
    const comments = require ('../controllers/comments.controller.js');

    // Create a new User
    app.post('/comments', comments.create);

    // Retrieve all Users
    app.get('/comments', comments.findAll);

    // Informations of One User
    app.get('/comments/:commentId', comments.findOne);

    //  Update a User with userId
    app.put('/comments/:commentId', comments.update);

    // Delete a User with userId
    app.delete('/comments/:commentId', comments.delete);
}