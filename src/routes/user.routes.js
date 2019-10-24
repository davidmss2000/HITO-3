module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new user if the email doesn't already exist
    app.post('/register', user.create);

    // Retrieve some information about any user with userId
    app.get('/user/:userId', user.getUserInfo);

    // Update an existing user with userId and password
    //app.put('/user/:userId', user.update);

    // Delete an existing user with userId and password
    //app.delete('/user/:userId', user.delete);
}