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
	var auth = null;
	if (req.session.name) {
		auth = true;
	}
	res.render('login', {
		loggedIn: auth
	});
}// ends myLogin


// app.get("/home")
function homePage(req, res) {
	var auth = null;
	if (req.session.name) {
		auth = true;
	}
		post.find().sort({
			date: -1
		}).limit(6).exec(function(err, blogPost) {
			if (err) {
				console.log("error meow");
			}
			console.log(blogPost);
			res.render('index', {
				loggedIn: auth,
				posts: blogPost
			}); // ends res.render
		}); // ends post.find
} // ends homePage


// This is just for XHR to view blogPost //
// app.get("/blogPost/:id")
function viewBlogPost(req, res) {
	res.render('index', {id: _id});
}// ends viewBlogPost

// app.get("/login/signup")
function mySignUp(req, res) {
	var auth = null;
	if (req.session.name) {
		auth = true;
	}
	res.render('signup', {
		loggedIn: auth
	});
}// ends mySignUp


// app.get("/home/profile")
function myProfile(req, res) {
	var auth = null;
	if(req.session.name) {
		auth = true;
	}
	res.render('profile', {
		loggedIn: auth
	});
}// ends myProfile


// app.get("/home/contact")
function contactMe(req, res) {
	var auth = null;
	if(req.session.name) {
		auth = true;
	}
	res.render('contact', {
		loggedIn: auth
	});
} // ends contactME


// end app.get("/home/projects")
function myProjects(req, res) {
	var auth = null;
	if (req.session.name) {
		auth = true;
	}
	res.render('projects', {
		loggedIn: auth
	});
}// ends myProjects


// app.get("/home/hacktheplanet")
function myHackPlanet(req, res) {
	var auth = null;
	if (req.session.name) {
		auth = true;
	}
	res.render('hacktheplanet', {
		loggedIn: auth
	});
}// ends myHackPlanet



/*###	GET NEW	###*/

// app.get("/home/newPost")
function newPost(req, res) {
	res.render('newPost');
}// ends newPost


// app.get('/logout')
function endSession(req, res) {
	req.session.destroy();
	res.send('<br />logged out!<br /><a href="/login">Check Session</a>');
}// ends endSession



/*###	POST CREATE	###*/

// app.post('/home/newpost')
function createPost(req, res) {
	var auth = null;
	if(req.session.name) {
		auth = true;
	}
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
	res.render("newPost", {
		loggedIn: auth
	});
}// ends createPost


// app.post("/login")
function verify(req, res) {
	var user = req.body.username;
	var pw = req.body.password;
	console.log(user);
	console.log(pw);
	if(user === "kingtak") {
		if(pw === "devleague") {
			req.session.name = user;
			console.log("Access Granted");
			res.send({redirect: '/home'});
			return;
		} else {
			res.send('Wrong password');
			return;
		}
	} else {
		res.send("Wrong User Name");
		return;
	}
}// ends verify




/*###	GET EDIT	###*/

// app.get("/home/oldPosts")
function oldPosts(req, res) {
	var auth = null;
	if(req.session.name) {
		auth = true;
	}
		post.find().sort({
			date: -1
		}).limit(6).exec(function(err, myOldPosts) {
			if (err) {
				console.log("error meow");
			}
			console.log(myOldPosts);
			res.render('oldPosts', {
				loggedIn: auth,
				posts: myOldPosts
			}); // ends res.render
		}); // ends post.find

} // ends oldPosts

/*###	GET UPDATE	###*/

// app.put("/home/oldPosts")
function editMyPost(req, res) {
	if(req.session.name) {
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
} else {
	res.send("You are not logged in");
}
}// ends editMyPost 



/* ###	GET DELETE	###*/

// app.delete("/home")
function deletePost(req, res) {
	if(req.session.name) {
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
	} else {
	res.send("You are not logged in");
}
}// ends deletePost




/*########	ROUTE HANDLERS	########*/


/*####	GET SHOW	####*/
// This is just for XHR to view blog post //
app.get("/blogPost/:id", function(req, res) {
	viewBlogPost(req, res);
});
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

app.get("/logout", function(req, res) {
	endSession(req, res);
});

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

// Verifies User Name and Password
app.post("/login", function(req, res) {
	verify(req, res);
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
