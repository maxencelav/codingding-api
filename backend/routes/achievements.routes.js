module.exports = (app) => {
    const achievements = require ('../controllers/achievements.controller.js');
    const {isLoggedIn} = require('../middlewares/middleware')

    // Create a new Achievement
    app.post('/achievements', achievements.create);

    // Retrieve all Achievement
    app.get('/achievements', achievements.findAll);

    // Informations of One Achievement
    app.get('/achievements/:achievementId', achievements.findOne);

    //  Update a Achievement with Id
    app.put('/achievements/:achievementId', achievements.update);

    // Delete a Achievement with Id
    app.delete('/achievements/:achievementId', achievements.delete);

    // When user likes an Achievement
    app.get('/achievements/:achievementId/like', isLoggedIn, achievements.like);

    // When user dislikes an Achievement
    app.get('/achievements/:achievementId/dislike', isLoggedIn, achievements.dislike)
}