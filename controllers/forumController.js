const router = require('express').Router();

const forumManager = require('../managers/forumManager');

router.get('/all', async (req, res) => {
    try {
        const allPosts = await forumManager.getAllPosts();

        res.status(200).json(allPosts);
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.get('/', async (req, res) => {
    try {
        let lastThreePosts = await forumManager.lastThreePosts();
        lastThreePosts = lastThreePosts.slice(0, 3);

        res.status(200).json(lastThreePosts);
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.post('/add', async (req, res) => {
    const postData = req.body;

    try {
        const addedPost = await forumManager.addPost(postData);

        res.status(200).json(addedPost);
    } catch (error) {
        res.status(400).json({
            message: 'Unable to add new post'
        })
    }
});

router.get('/post/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const foundPost = await forumManager.getPost(postId);
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.post('/post/:id/comment', async (req, res) => {
    const postId = req.params.id;

    try {
        const comment = await forumManager.addComment(postId, req.body);
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.get('/post/:id/comment', async (req, res) => {
    const postId = req.params.id;

    try {
        const allComments = await forumManager.getComments(postId);
        res.status(200).json(allComments)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router;