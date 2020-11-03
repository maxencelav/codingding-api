module.exports = (app) => {
    const achievements = require ('../controllers/achievements.controller.js');

    // Create a new User
    app.post('/achievements', achievements.create);

    // Retrieve all Users
    app.get('/achievements', achievements.findAll);

    // Informations of One User
    app.get('/achievements/:achievementId', achievements.findOne);

    //  Update a User with userId
    app.put('/achievements/:achievementId', achievements.update);

    // Delete a User with userId
    app.delete('/achievements/:achievementId', achievements.delete);
}