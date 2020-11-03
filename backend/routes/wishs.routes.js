module.exports = (app) => {
    const wishs = require ('../controllers/wishs.controller.js');

    // Create a new User
    app.post('/wishs', wishs.create);

    // Retrieve all Users
    app.get('/wishs', wishs.findAll);

    // Informations of One User
    app.get('/wishs/:wishId', wishs.findOne);

    //  Update a User with userId
    app.put('/wishs/:wishId', wishs.update);

    // Delete a User with userId
    app.delete('/wishs/:wishId', wishs.delete);
}