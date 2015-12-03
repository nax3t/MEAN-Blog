var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
                    title: { type: String, required: true, trim: true },
                    body: { type: String, required: true, trim: true },
                    imageUrl: { type: String, required: true, trim: true },
                    user: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "User",
                      required: true
                    }
                });

var Post = mongoose.model("post", postSchema);

module.exports = Post;