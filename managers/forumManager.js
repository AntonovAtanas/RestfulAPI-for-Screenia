const Post = require('../models/Post');

exports.addPost = (postData) => Post.create(postData);

exports.getAllPosts = () => Post.find().populate('_ownerId');

exports.lastThreePosts = () => Post.find().sort({ _id: -1 }).populate('_ownerId');

exports.getPost = (postId) => Post.findById({ _id: postId }).populate('_ownerId');

exports.addComment = async (postId, commentData) => {
    let post = await Post.findById({_id: postId});
    post.commentsList.push(commentData);
    await post.save();

    // return the most recent comment with date added from the model
    const userComment = post.commentsList[post.commentsList.length-1];
    return userComment;
};

exports.getComments = async (postId) =>{
    const foundMovie = await Post.findById(postId).populate('commentsList.userId');
    return foundMovie.commentsList;
};

