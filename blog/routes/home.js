var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

// mongoose Schema
var schema = new mongoose.Schema({title: String, content: String, date: {type: Date, default: Date.now}});

// mongoose Model
var post = mongoose.model('post', schema);// ends post


// app.get("/home")
function homePage(req, res) {
	res.render('index');
} // ends homePage
       

// app.get("/home/newPost")
function newPost(req, res) {
	var postTitle = req.body.title;
	var postContent = req.body.content;
	var myPost = new post({
		title: postTitle,
		content: postContent
	});// ends myPost
	console.log(myPost);
	myPost.save(function(err) {
		if(err) {
			console.log("meow myPost");
			res.send("Server Error");
		}
	});// ends myPost.save

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
// Calls the new post page to POST
app.post("/home/newpost", function(req, res) {
	newPost(req, res);
});

