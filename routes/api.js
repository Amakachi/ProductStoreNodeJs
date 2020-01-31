const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    let filename = Date.now() + path.extname(file.originalname);
    cb(null, filename)
  }
})
 
var upload = multer({ storage: storage }).single('image');

router.get('/collections', function(req, res, next){
  Collection.find({}, {'name': true, 'price': true, 'image': true }).sort({_id:-1}).then(function(collections){
    res.send(collections);
  }).catch(function(next){
    res.send(next);
  });
});

router.post('/collections', function(req, res, next){
  upload(req, res, function(err){
    if(err){
      console.log(err);
    }else{
      const newCollection = new Collection();
      newCollection.name = req.body.name;
      newCollection.description = req.body.description;
      newCollection.price = req.body.price;
      newCollection.category = req.body.category;
      newCollection.image = req.file.filename;
      newCollection.color = req.body.color;
      newCollection.save().then(function(collection){
        res.send(collection);
      }).catch(function(next){
        res.send(next);
      });
      console.log(req.file.filename);
     console.log(req.body);
    }
  })
}); 

router.get('/collections/:id', function(req, res, next){
  Collection.findById(req.params.id).then(function(collection){
      res.send(collection)
    }).catch(function(next){
      res.send(next);
    });
});

module.exports = router;
