var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIt');

// mongoose Schema
var schema = new mongoose.Schema({title: String, content: String, date: {type: Date, default: Date.now}});

// mongoose Model
var post = mongoose.model('post', schema);// ends post


/*		GET SHOW	*/


// app.get("/login")
function myLogin(req, res) {
	res.render('login');
}// ends myLogin


// app.get("/home")
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


// app.get("/login/signup")
function mySignUp(req, res) {
	res.render('signup');
}// ends mySignUp

// app.get("/home/profile")
function myProfile(req, res) {
	res.render('profile');
}// ends myProfile


// app.get("/home/contact")
function contactMe(req, res) {
	res.render('contact');
} // ends contactME


// end app.get("/home/projects")
function myProjects(req, res) {
	res.render('projects');
}// ends myProjects


// app.get("/home/hacktheplanet")
function myHackPlanet(req, res) {
	res.render('hacktheplanet');
}// ends myHackPlanet



/*###	GET NEW	###*/

// app.get("/home/newPost")
function newPost(req, res) {
	res.render('newPost');
}// ends newPost



/*###	POST CREATE	###*/

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



/*###	GET EDIT	###*/

// app.get("/home/oldPosts")
function oldPosts(req, res) {
	post.find().sort({date: -1}).limit(6).exec(function(err, myOldPosts) {
		if(err) {
			console.log("error meow");
		}
		console.log(myOldPosts);
		res.render('oldPosts', {
		posts: myOldPosts
	});// ends res.render
	});// ends post.find
}// ends oldPosts



/*###	GET UPDATE	###*/

// app.put("/home/oldPosts")
function editMyPost(req, res) {
	var numId = req.param('id');
	var postTitle = req.body.title;
	var postContent = req.body.content;
 
	post.findOneAndUpdate({
		_id: numId
	}, {title: postTitle,
		content: postContent
	},
	function(err) {
		if(err) {
			console.log("error in edit meow");
		}
		console.log("Post Has Been Edited");
		res.send("Editededed");
	});// ends post.findOneAndUpdate
}// ends editMyPost 



/* ###	GET DELETE	###*/

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




/*########	ROUTE HANDLERS	########*/


/*####	GET SHOW	####*/

// Calls the home page
app.get("/home", function(req, res) {
	homePage(req, res);
});

// Calls the login page
app.get("/login", function(req, res) {
	myLogin(req, res);
});

// Calls the signup page
app.get("/login/signup", function(req, res) {
	mySignUp(req, res);
});

// Calls the profile
app.get("/home/profile", function(req, res) {
	myProfile(req, res);
});

// Calls the contact
app.get("/home/contact", function(req, res) {
	contactMe(req, res);
});

// Calls projects
app.get("/home/projects", function(req, res) {
	myProjects(req, res);
});

// Calls hack the planet!
app.get("/home/hacktheplanet", function(req, res) {
	myHackPlanet(req, res);
});// ends app.get("home/hacktheplanet")



/*####		GET NEW		####*/

// Calls the new post page
app.get("/home/newPost", function(req, res) {
	newPost(req, res);
});

/*####		POST CREATE		####*/

// Calls the new post page so that it may POST
app.post("/home/newpost", function(req, res) {
	createPost(req, res);
});

/*####	GET EDIT	####*/

// Calls the old posts
app.get("/home/oldPosts", function(req, res) {
	oldPosts(req, res);
});

/*####	PUT UPDATE	####*/

// Calls the edit function
app.put("/home/:id", function(req, res) {
	editMyPost(req, res);
});

/*####	GET DELETE	####*/

// On the old posts page it deletes the current post
app.delete('/home/:id', function(req, res) {
	deletePost(req, res);
});
