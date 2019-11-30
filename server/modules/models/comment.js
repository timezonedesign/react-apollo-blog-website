const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: Number,
    content: String,
    post_id: Number
});

const Comment = model('comment', commentSchema);

module.exports = Comment;