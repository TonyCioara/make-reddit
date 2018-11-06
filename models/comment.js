const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    post: {type: Schema.Types.ObjectId, reg: 'Post', required: true},
    replies: [
        {
            content: {type: String, required: true},
        }
    ]
});

module.exports = mongoose.model("Comment", CommentSchema);