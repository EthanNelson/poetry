var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Suggest-a-Poem' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});


let emotion = 'happy';

let url = `http://poetrydb.org/lines/` + emotion;

request(url, function (err, response, body) {
  if (err) {
    console.log('error:', error);
  } 
  else {
	let poem = JSON.parse(body);
	let message = poem[0].title + "\n" + poem[0].author + "\n" + poem[0].lines;
	console.log(message);  	
   }
});

module.exports = router;