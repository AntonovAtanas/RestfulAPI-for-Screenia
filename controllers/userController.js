const router = require('express').Router();

const userManager = require('../managers/userManager');
const movieManager = require('../managers/movieManager');

router.post('/register', async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await userManager.register({ username, password });

        res.json(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Username already exists!' })
        } else {
            res.status(400).json({ message: 'Error creating user!' })
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userManager.login({ username, password });

        res.json(user)
    } catch (error) {
        res.status(401).json({
            message: 'Invalid username or password!'
        })
    }
});

router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userLikedMovies = await movieManager.userLikedMovies(userId);
        res.status(200).json(userLikedMovies);
    } catch (error) {
        res.status(400).json({
            message: 'Can not get user liked movies!'
        })
    }
})

module.exports = router;