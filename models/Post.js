const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title is required'],
    },
    description: {
        type: String,
        required: [true, 'Post description is required'],
        minLength: [20, 'Post description must be at least 20 characters long'],
        maxLength: [200, 'Post description must be maximum 200 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    commentsList: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: [true, 'Please enter your comment']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;