const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    reviewsList: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        review: {
            type: String,
            required: [true, 'Please enter your review']
        },
        rating: {
            type: Number,
            required: [true, 'Please enter your rating']
        }
    }],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;