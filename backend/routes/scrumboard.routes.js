module.exports = (app) => {
    const scrumboards = require ('../controllers/scrumboards.controller.js');
    const middleware = require('../middlewares/middleware');

    // Create a new Scrumboard
    app.post('/scrumboards', scrumboards.create);

    // Retrieve all Scrumboard
    app.get('/scrumboards', scrumboards.findAll);

    // Informations of One Scrumboard
    app.get('/scrumboards/:scrumboardId', scrumboards.findOne);

    //  Update a Scrumboard with Id
    app.put('/scrumboards/:scrumboardId', scrumboards.update);

    // Delete a Scrumboard with Id
    app.delete('/scrumboards/:scrumboardId', scrumboards.delete);

    // Create a new Story in Scrumboard with id
    app.post('scrumboards/:scrumboardId/story', scrumboards.createStory)

    // Add member to scrumboard
    app.put('/scrumboards/:scrumboardId/addMember', scrumboards.addMember)

    // Delete member to scrumboard
    app.delete('/scrumboards/:scrumboardId/deleteMember', scrumboards.deleteMember)

}