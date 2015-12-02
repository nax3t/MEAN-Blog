var express = require('express');
		router = express.Router(),
		db = require("../models");

router.route('/posts')
  .get(function (req, res) {
    db.Post.find({}, function (err, posts){
    	res.send(posts);
    })
  })
  .post(function (req, res) {
    db.Post.create(req.body, function (err, post){
			if (err) {
				console.log(err);
			} else {
				res.send(post);
			}
    });
  });

router.route('/posts/:id')
	.get(function (req, res) {
		res.send('Show a post');
	})
	.put(function (req, res) {
    res.send('Update a post');
  })
  .delete(function (req, res) {
    res.send('Delete a book');
  });

module.exports = router;