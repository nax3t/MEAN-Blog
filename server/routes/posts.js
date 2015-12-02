var express = require('express');
		router = express.Router(),
		db = require("../models");

router.route('/')
  .get(function (req, res) {
    db.Post.find({}, function (err, posts){
    	res.status(200).send(posts);
    })
  })
  .post(function (req, res) {
    db.Post.create(req.body, function (err, post){
			if (err) {
				console.log(err);
			} else {
				res.status(201).send(post);
			}
    });
  });

router.route('/:id')
	.get(function (req, res) {
		db.Post.findById(req.params.id, function (err, post) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(post);
      }
    });
	})
	.put(function (req, res) {
    db.Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(post);
      }
    });
  })
  .delete(function (req, res) {
    db.Post.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(post);
      }
    })
  });

module.exports = router;