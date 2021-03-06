const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs')

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.render('index', {poemTitle: null, poemAuthor: null, poemLines: null, error: null});
})

app.post('/', function (req, res) {
	let emotion = req.body.feeling;
	let url = `http://poetrydb.org/lines/` + emotion; //PoetryDB from thundercomb. https://github.com/thundercomb/poetrydb

	request(url, function (err, response, body) {
	    if (err) {
	      res.render('index', {poem: null, error: ' please try again'});
	    } 
	    else {
	      let poem = JSON.parse(body);
	      let poemNumber = Math.floor(Math.random() * poem.length - 0 + 1);
	      console.log(poemNumber);
	        res.render('index', {poemTitle: poem[poemNumber].title, poemAuthor: poem[poemNumber].author, poemLines: poem[poemNumber].lines, error: null});
	    }
	  });
})
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});