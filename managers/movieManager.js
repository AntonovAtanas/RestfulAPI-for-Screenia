const Movie = require('../models/Movie');

exports.addmovie = (movieData) => Movie.create(movieData);

exports.getAllMovies = () => Movie.find();

exports.getMovie = (movieId) => Movie.findById(movieId);

exports.editMovie = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);

exports.searchMovies = async (searchTerm) => {
    let allMovies = await Movie.find();
    const filteredMovies = allMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return filteredMovies;
}

exports.getLastMovies = () => Movie.find().sort({ _id: -1 });

exports.deleteMovie = (movieId) => Movie.findByIdAndDelete(movieId);

exports.getMostLikedMovies = async () => {
    let allMovies = await Movie.find();

    allMovies.sort((a, b) => b.likes.length - a.likes.length)
    return allMovies
}

// movie reviews
exports.addReview = async (movieId, reviewData) => {
    const foundMovie = await Movie.findById(movieId);
    foundMovie.reviewsList.push(reviewData);
    await foundMovie.save();
    return reviewData;
}

exports.userLikedMovies = async (userId) => {
    let allMovies = await Movie.find();
    allMovies = allMovies.filter(movie => movie.likes.includes(userId))
    return allMovies
} 

exports.hasUserReviewed = async (movieId, userId) => {
    const foundMovie = await Movie.findById(movieId);
    const hasReviewed = foundMovie.reviewsList.find((document) => document.userId == userId);

    if (hasReviewed) {
        return true;
    };
    return false;
}

exports.getAllReviews = async (movieId) => await Movie.findById(movieId).populate('reviewsList.userId');

exports.likeMovie = async (movieId, userId) => {
    const foundMovie = await Movie.findById(movieId);
    foundMovie.likes.push(userId);
    await foundMovie.save();
    return foundMovie;
}

exports.hasUserLiked = async (movieId, userId) => {
    const foundMovie = await Movie.findById(movieId);
    const hasUserLiked = foundMovie.likes.find((user) => user == userId)

    if (hasUserLiked) {
        return true;
    };
    return false;
}

exports.unlikeMovie = async (movieId, userId) => {
    const foundMovie = await Movie.findById(movieId);
    const userIndex = foundMovie.likes.indexOf(userId);

    if (userIndex !== -1) {
        foundMovie.likes.splice(userIndex, 1);
    }

    await foundMovie.save();
    return foundMovie;
}