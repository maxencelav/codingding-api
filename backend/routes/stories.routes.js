module.exports = (app) => {
    const stories = require ('../controllers/stories.controller.js');

    // Create a new Story
    app.post('/stories', stories.create);

    // Retrieve all Stories
    app.get('/stories', stories.findAll);

    // Informations of One Story
    app.get('/stories/:storyId', stories.findOne);

    //  Update a Story with storyId
    app.put('/stories/:storyId', stories.update);

    // Delete a Story with storyId
    app.delete('/stories/:storyId', stories.delete);

    // STORIES LINKED TO SCRUMBOARD
    // Get all stories
    app.get('/stories/scrumboard/:boardId', stories.findAllFromScrum)
}