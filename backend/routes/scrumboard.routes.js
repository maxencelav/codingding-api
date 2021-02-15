module.exports = (app) => {
    const scrumboards = require ('../controllers/scrumboards.controller.js');

    // Create a new User
    app.post('/scrumboards', scrumboards.create);

    // Retrieve all Users
    app.get('/scrumboards', scrumboards.findAll);

    // Informations of One User
    app.get('/scrumboards/:scrumboardId', scrumboards.findOne);

    //  Update a User with userId
    app.put('/scrumboards/:scrumboardId', scrumboards.update);

    // Delete a User with userId
    app.delete('/scrumboards/:scrumboardId', scrumboards.delete);
}