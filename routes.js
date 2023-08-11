const router = require('express').Router();


const userController = require('./controllers/userController');
const movieController = require('./controllers/moviesController');
const forumController = require('./controllers/forumController');

router.use('/users', userController);
router.use('/movies', movieController);
router.use('/forum', forumController);


module.exports = router ;
