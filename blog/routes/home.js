var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

// mongoose Schema
var schema = new mongoose.Schema({title: String, content: String, date: {type: Date, default: Date.now}});

// mongoose Model
var post = mongoose.model('post', schema);// ends post


// // app.get("/home")
function homePage(req, res) {

	post.find().sort({date: -1}).limit(6).exec(function(err, blogPost) {
		if(err) {
			console.log("error meow");
		}
		console.log(blogPost);
		res.render('index', {
		posts: blogPost
	});// ends res.render
	});// ends post.find
} // ends homePage



// app.get("/home/newPost")
function newPost(req, res) {

	res.render('newPost');
}// ends newPost


// app.post('/home/newpost')
function createPost(req, res) {
	var postTitle = req.body.title;
	var postContent = req.body.content;
	var postDate = req.body.date;
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
	res.render("newPost");
}// ends createPost



// app.delete("/home")
function deletePost(req, res) {
	var idNum = req.param('id');
	post.findOneAndRemove({
		_id: idNum
	}, function(err) {
		if(err) {
			console.log("WTF?");
		}
		console.log("deleted");
		res.send('success');
	});
}// ends deletePost



// app.get("/home/oldPosts")
function oldPosts(req, res) {
	post.find(function(err, myOldPosts) {
		if(err) {
			console.log("error in oldPosts serverside");
		}
		res.render('oldPosts', {
			posts: myOldPosts
		});
	});// ends post.find
}// ends oldPosts



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
	createPost(req, res);
});
// On the home page it deletes the current post
app.delete('/home/:id', function(req, res) {
	deletePost(req, res);
});
// Calls the old posts
app.get("/home/oldPosts", function(req, res) {
	oldPosts(req, res);
});// ends app.get("/home/oldPosts")