var express = require("express");
var app = express();
var router = express.Router();
var db = require("../models");
var path = require("path");
var jwt = require('jsonwebtoken');
var secret = "awesomesauce";
var token;

// only allow AJAX calls to prevent tampering in the browser bar 
function checkHeaders(req,res,next){
  if(!req.headers["x-requested-with"]) {
    res.sendFile(path.join(__dirname, '../../client', 'index.html'));
  }
  else {
    next();
  }
}

// middleware to check the token against params to authorize a user
function checkToken(req,res,next){
  try {
    var decoded = jwt.verify(req.headers.authorization.split(" ")[1], secret);
    if(decoded.id === req.params.id){
      req.decoded_id = decoded.id;
      next();
    }
    else {
      res.status(401).send("Not Authorized");
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

router.use(checkHeaders);

router.post('/signup',function(req,res){
  db.User.create(req.body, function(err,user){
    if(err)
      return res.status(400).send("Username/Password can't be blank and Username must be unique");
    var listedItems = {id: user._id, username: user.username};
    token = jwt.sign({ id: user._id}, secret);
    res.json({token:token, user:listedItems});
  });
});

router.post('/login',function(req,res){
  db.User.authenticate(req.body, function(err,user){
    if(err) return res.status(500).send(err)
    if (!user) return res.status(400).send(err)
    var listedItems = {id: user._id, username: user.username};
    token = jwt.sign({ id: user._id}, secret);
    res.json({token:token, user:listedItems});
  });
});

router.get('/', function(req,res){
  db.User.find({}, function(err,users){
    if (err) res.status(500).send(err);
    res.status(200).send(users);
  });
});

router.get('/:id', checkToken, function(req,res){
  db.User.findById(req.decoded_id, function(err,user){
    if (err) res.status(500).send(err);
    if (!user) res.status(401).send(err);
    var listedItems = {id: user._id, username: user.username};
    res.status(200).send(listedItems);
  });
});

router.put('/:id', checkToken, function(req,res){
 db.User.findByIdAndUpdate(req.decoded_id, req.body, {new: true}, function(err,user){
   if (err) res.status(400).send(err);
   else {
    var listedItems = {id: user._id, username: user.username};
    res.status(200).send(listedItems);
   }
 });
});

router.delete('/:id', checkToken, function(req,res){
  db.User.findByIdAndRemove(req.decoded_id, function(err,user){
    if (err) res.status(500).send(err);
    if (!user) res.status(401).send(err);
    res.status(200).send("Removed");
  });
});

module.exports = router;
