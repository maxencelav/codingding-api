module.exports = (app) => {
    const tasks = require ('../controllers/tasks.controller.js');

    // Create a new User
    app.post('/tasks', tasks.create);

    // Retrieve all Users
    app.get('/tasks', tasks.findAll);

    // Informations of One User
    app.get('/tasks/:taskId', tasks.findOne);

    //  Update a User with userId
    app.put('/tasks/:taskId', tasks.update);

    // Delete a User with userId
    app.delete('/tasks/:taskId', tasks.delete);
}