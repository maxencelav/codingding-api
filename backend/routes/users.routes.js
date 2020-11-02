module.exports = (app) => {
    const users = require ('../controllers/users.controller.js');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    //  Update a User with userId
    app.get('/users/:usersId', users.update);

    // Delete a User with userId
    app.delete('/users/:usersId', users.delete);
}