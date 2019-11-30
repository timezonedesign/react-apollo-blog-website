const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: Number,
    title: String,
    content: String,
    like_count: Number
});

const Post = model('post', postSchema);

module.exports = Post;