const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var port = process.env.PORT || 8080;

const app = express();

mongoose.connect('mongodb://admin:daniella1@ds149998.mlab.com:49998/heroku_hxfjqrf6', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next){
  res.status(422).send({error: err._message});
});

app.listen(port, function(){
  console.log("Server started and running on " + port);
})
