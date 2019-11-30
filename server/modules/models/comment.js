const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: Number,
    content: String,
});

const Comment = model('comment', commentSchema);

module.exports = Comment;