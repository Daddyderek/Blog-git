var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

// app.get("/home")
function homePage(req, res) {
	res.render('index');
} // ends homePage


// app.get("/home/newPost")
function newPost(req, res) {
	// console.log("i'm working in new post");
	res.render('newPost');
}// ends newPost




/*		ROUTE HANDLERS		*/

// Calls the home page
app.get("/home", function(req, res) {
	homePage(req, res);
});

// Calls the new post page
app.get("/home/newPost", function(req, res) {
	newPost(req, res);
});