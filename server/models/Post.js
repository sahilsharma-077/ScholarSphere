const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    sharedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },   // <-- comma here

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
