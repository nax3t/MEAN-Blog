var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mean-blog-db");

mongoose.set("debug", true);

module.exports.Post = require("./post");
module.exports.User = require("./user");