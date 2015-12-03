var express = require('express');
		router = express.Router(),
		db = require("../models"),
    jwt = require('jsonwebtoken'),
    secret = "awesomesauce";
var token;

// middleware to check the token against params to authorize a user
function checkToken(req,res,next){
  db.Post.findById(req.params.id, function (err, post) {
  try {
    var decoded = jwt.verify(req.headers.authorization.split(" ")[1], secret);
    if(decoded.id === post.user.toString()){
      req.decoded_id = decoded.id;
      next();
    }
    else {
      res.status(401).send("Not Authorized");
    }
  } catch(err) {
    res.status(500).send(err.message);
  }})
}

router.route('/')
  .get(function (req, res) {
    db.Post.find({}, function (err, posts){
    	res.status(200).send(posts);
    })
  })
  .post(function (req, res) {
    console.log(req.body)
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
  .delete(checkToken, function (req, res) {
    db.Post.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(post);
      }
    })
  });

module.exports = router;