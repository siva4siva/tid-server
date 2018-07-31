const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user_id: String,
    user_avatar: String,
    user_name: String
},
{ _id: false });

const PostSchema = new Schema({
    post_author: {
        type: String,
        required: [true, 'author field is required']
    },
    post_title: {
        type: String,
        required: [true, 'title field is required']
    },
    post_type: {
        type: String,
        enum: ['blog', 'artical'],
        required: [true, 'type field is required']
    },
    post_status: {
        type: String,
        enum: ['publish', 'pending', 'trash','private'],
        required: [true, 'status field is required']
    },
    post_access: {
        type: String,
        enum: ['superAdmin','admin', 'endUser','all'],
        required: [true, 'access field is required']
    },
    post_slug: {
        type: String,
        unique : true,
        required: [true, 'slug field is required']
    },
    post_like: [LikeSchema],
    post_comment: [],
    post_meta: [],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model('post', PostSchema);

module.exports = user;
