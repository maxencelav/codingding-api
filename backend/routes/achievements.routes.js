module.exports = (app) => {
    const achievements = require ('../controllers/achievements.controller.js');
    const {isLoggedIn} = require('../middlewares/middleware')

    // Create a new User
    app.post('/achievements', isLoggedIn, achievements.create);

    // Retrieve all Users
    app.get('/achievements', isLoggedIn, achievements.findAll);

    // Informations of One User
    app.get('/achievements/:achievementId', isLoggedIn, achievements.findOne);

    //  Update a User with userId
    app.put('/achievements/:achievementId', isLoggedIn, achievements.update);

    // Delete a User with userId
    app.delete('/achievements/:achievementId', isLoggedIn, achievements.delete);

    // When user likes an Achievement
    app.get('/achievements/:achievementId/like', isLoggedIn, achievements.like);

    // When user dislikes an Achievement
    app.get('/achievements/:achievementId/dislike', isLoggedIn, achievements.dislike)
}