var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

function Resource(req, res) {

	res.render('index');
}// ends homePage

 // ROUTE HANDLERS 
app.get("/home", function(req, res) {
	Resource(req, res);
});