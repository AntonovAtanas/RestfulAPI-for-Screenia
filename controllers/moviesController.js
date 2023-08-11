const router = require('express').Router();

const movieManager = require('../managers/movieManager');

const reviewCounter = require('../utils/reviewCounter')

// add new
router.post('/add', async (req, res) => {

    try {
        await movieManager.addmovie(req.body);
        res.status(201).end();
    } catch (error) {
        res.status(400).json({
            message: 'Unable to add new movie'
        })
    }
});

// get all movies
router.get('/all', async (req, res) => {
    try {
        const allMovies = await movieManager.getAllMovies();
        res.status(200).json(allMovies)
    } catch (error) {
        res.status(400).json({
            message: 'Can not get all movies!'
        })
    }
});

// get latest movies
router.get('/latest=:movies', async (req, res) => {
    const moviesNumber = req.params.movies;

    try {
        let latestMovies = await movieManager.getLastMovies();
        latestMovies = latestMovies.slice(0, moviesNumber);

        res.status(200).json(latestMovies)
    } catch (error) {
        res.status(400).json({
            message: 'Can not get the latest movies'
        })
    }
})

// get most liked movies
router.get('/most-liked=:movies', async (req, res) => {
    const moviesNum = Number(req.params.movies);

    try {
        let mostLikedMovies = await movieManager.getMostLikedMovies();
        mostLikedMovies = mostLikedMovies.slice(0, moviesNum)
        res.status(200).json(mostLikedMovies)
    } catch (error) {
        res.status(400).json({
            message: 'Can not get the most liked movies'
        })
    }
})

// get top movie
router.get('/top-movie', async (req, res) => {
    try {
        let allMovies = await movieManager.getAllMovies();

        let mostLikedMovie = allMovies.sort((a, b) => {
            let movieArating = reviewCounter(a.reviewsList);
            let movieBrating = reviewCounter(b.reviewsList);
            
            let ratingDiff = movieBrating - movieArating;

            return ratingDiff || b.likes.length - a.likes.length
        })

        res.status(200).json(mostLikedMovie[0])
    } catch (error) {
        res.status(400).json({
            message: 'Can not get the top movie'
        })
    }
})

// get movie details
router.get('/details/:id', async (req, res) => {

    try {
        const foundMovie = await movieManager.getMovie(req.params.id);
        
        res.json(foundMovie)
    } catch (error) {
        res.status(404).json({
            message: 'Can not find movie'
        })
    }
});

// get movie stats
router.get('/details/:id/stats', async (req, res) => {

    try {
        const foundMovie = await movieManager.getMovie(req.params.id);        
        const rating = reviewCounter(foundMovie.reviewsList);
        const likes = foundMovie.likes.length;

        res.json({
            rating,
            likes
        })

    } catch (error) {
        res.status(404).json({
            message: 'Can not find movie stats'
        })
    }
})

router.get('/search/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const searchResults = await movieManager.searchMovies(searchTerm);

        res.status(200).json(searchResults)
    } catch (error) {
        res.status(400).json({
            message: 'Can not get search results'
        })
    }
})

// edit movie
router.put('/edit/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;
    try {
        const editedMovie = await movieManager.editMovie(movieId, movieData);

        res.json(editedMovie)
    } catch (error) {
        res.status(400).json({
            message: 'Can not edit movie data'
        })
    }
});

router.delete('/delete/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const deleteMovie = await movieManager.deleteMovie(movieId);

        res.status(200).json(deleteMovie)
    } catch (error) {
        res.status(400).json({
            message: 'Can not delete movie'
        })
    }
})

// movie reviews 
router.post('/details/:id/reviews', async (req, res) => {
    const movieId = req.params.id;
    const reviewData = req.body;

    try {
        const userReview = await movieManager.addReview(movieId, reviewData);

        res.status(201).json(userReview);
    } catch (error) {
        res.status(400).json({
            message: 'Can not add comment'
        })
    }
});

router.get('/details/:movieId/reviews/:userId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.params.userId;

    try {
        const hasReviewed = await movieManager.hasUserReviewed(movieId, userId);
        res.json({hasReviewed});
    } catch (error) {
        res.json({error: error.message});
    }
});

router.get('/details/:movieId/reviews', async (req, res) => {

    try {
        const movieId = req.params.movieId;
        const allReviews = await movieManager.getAllReviews(movieId);
        
        res.status(200).json(allReviews.reviewsList)
    } catch (error) {
        console.log('error')
        res.status(400).json({
            message: 'Can not get reviews'
        })
    }
});

//like movie
router.post('/details/:movieId/like', async (req, res) => {
    const userId = req.body.userId;
    const movieId = req.params.movieId;

    try {
        const likedMovie = await movieManager.likeMovie(movieId, userId);

        res.status(201).json(likedMovie);
    } catch (error) {
        res.status(400).json({
            message: 'Error adding a like'
        })
    }
});

// has user liked movie
router.get('/details/:movieId/like/:userId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.params.userId;

    try {
        const hasLiked = await movieManager.hasUserLiked(movieId, userId);
        res.json({hasLiked});
    } catch (error) {
        res.status(400).json({
            message: 'Can not check if user liked'
        })
    }
});

router.post('/details/:movieId/unlike', async (req, res) => {
    const userId = req.body.userId;
    const movieId = req.params.movieId;

    try {
        const unlikedMovie = await movieManager.unlikeMovie(movieId, userId);
        
        res.status(201).json(unlikedMovie);
    } catch (error) {
        res.status(400).json({
            message: 'Error unliking a movie'
        })
    }
});



module.exports = router ;
