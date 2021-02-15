module.exports = (app) => {
    const weeks = require ('../controllers/agenda.controller.js');

    // Create a new User
    app.post('/schedule', weeks.create);

    // Retrieve all Users
    app.get('/schedule', weeks.findAll);

    // Informations of One User
    app.get('/schedule/:scheduleId', weeks.findOne);

    //  Update a User with userId
    app.put('/schedule/:scheduleId', weeks.update);

    // Delete a User with userId
    app.delete('/schedule/:scheduleId', weeks.delete);
}