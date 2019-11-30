const { Schema, model } = require('mongoose');
const Comment = require('./comment');

const postSchema = new Schema({
    author: Number,
    title: String,
    content: String,
    like_count: Number,
    comments: [Comment.schema]
});

const Post = model('post', postSchema);

module.exports = Post;