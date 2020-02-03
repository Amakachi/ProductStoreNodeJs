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
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: 'dwysc8biq',
        api_key: '836923983581294',
        api_secret: 'jTx4bTkVbO9slarINy47nxyMXgQ'
      })

      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
     var url;
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        function(err, image) {
          if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')
            // remove file from server
            const fs = require('fs')
            fs.unlinkSync(path)
            // return image details
            res.json(image)
            //console.log(image)
            // console.log(res.json(image))
            const newCollection = new Collection();
      newCollection.name = req.body.name;
      newCollection.description = req.body.description;
      newCollection.price = req.body.price;
      newCollection.category = req.body.category;
      newCollection.image = image.url;
      newCollection.color = req.body.color;
      newCollection.save().then(function(collection){
        res.send(collection);
      }).catch(function(next){
        res.send(next);
      });
      console.log(req.file.filename);
     console.log(req.body);

        }
      )
      console.log(url)
    //   const newCollection = new Collection();
    //   newCollection.name = req.body.name;
    //   newCollection.description = req.body.description;
    //   newCollection.price = req.body.price;
    //   newCollection.category = req.body.category;
    //   newCollection.image = url;
    //   newCollection.color = req.body.color;
    //   newCollection.save().then(function(collection){
    //     res.send(collection);
    //   }).catch(function(next){
    //     res.send(next);
    //   });
    //   console.log(req.file.filename);
    //  console.log(req.body);
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
