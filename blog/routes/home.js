var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

function homePage(req, res) {
	res.send('success');
}// ends homePage

/* ROUTE HANDLERS */
app.get("/", function(req, res) {
	homePage(req, res);
});