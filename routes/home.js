var express  	= require('express');
var app 	 	= module.exports = express();
var mongoose 	= require('mongoose');
var nodemailer 	= require('nodemailer'); 

// Connects to mongo databases
mongoose.connect('mongodb://reptar:w0rsh1p2010@ds033907.mongolab.com:33907/blog');

// mongoose Schema
var schema = new mongoose.Schema({title: String, content: String, date: {type: Date, default: Date.now}});


// mongoose Models
var post	  = mongoose.model('post', schema);
var portfolio = mongoose.model('portfolio', schema);


/*##############################	GET SHOW	############################## */





// app.get("/login")
function myLogin( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

	}

	res.render( 'login',

	{
		loggedIn : auth
	});

}// ends myLogin




// app.get("/")
function homePage( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

	}

	post.find().sort({

		date: -1

	}).limit( 6 ).exec( function( err, blogPost ) {

		if ( err ) {

			console.log('Error '+err);
			res.send('Error '+err);

		}
		console.log()
		res.render('index',

		{
			loggedIn : auth,
			posts	 : blogPost

		}); // ends res.render

	}); // ends post.find

} // ends homePage




// This is just for XHR to view blogPost //

// app.get("/blogPost/:id")
function viewBlogPost(req, res) {

	var idNum = req.param('id');

	post.findOne({
		
		_id: idNum

	},

	function( err, obj ) {

		if ( err ) {

			console.log('Error '+err);
			res.send('Error '+err);

		}
			res.json(obj);

	});


} // ends viewBlogPost




// app.get("/portfolio")
function myPortfolio( req, res ) {

	var auth = null;

	if( req.session.name ) {

		auth = true;

	}

	portfolio.find().sort( { date: -1 } ).exec( 

		function(err, portfolioPost) {

		if (err) {

			console.log("Error "+err);
			res.send("Error "+err);

		}

		res.render('portfolio',

		{

			loggedIn	: auth,
			portfolios	: portfolioPost

		});

	});

}// ends myPortfolio	




// app.get("/about")
function aboutMe( req, res ) {

	var auth = null;

	if( req.session.name ) {

		auth = true;

	}

	res.render( 'about',

	{
		loggedIn : auth
	});

} // ends about




// app.get("/hacktheplanet")
function myHackPlanet( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

	}

	res.render( 'hacktheplanet',

	{
		loggedIn : auth
	});

}// ends myHackPlanet




/*##############################  	GET NEW	 	##############################*/




// app.get("/blog/newPost")
function newPost( req, res ) {

	res.render('newPost');

}// ends newPost




// app.get('/logout')
function endSession( req, res ) {

	req.session.destroy();

	res.redirect('/login');

}// ends endSession




/*##############################  	POST CREATE		############################## */




// app.post("/portfolio")
function addPortfolio( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

	}

	var portfolioTitle 	 = req.body.title;
	var portfolioContent = req.body.content;
	var postDate 		 = req.body.date;
	var myPortfolio 	 = new portfolio (

	{

		title 	: portfolioTitle,
		content : portfolioContent

	});// ends var myPortfolio

	myPortfolio.save( function( err ) {

		if ( err ) {

			console.log('Error '+err);
			res.send('Error '+err);

		} else {

			res.redirect("myPortfolio", 
			{
				
				loggedIn: auth

			});

		}

	});

}// ends addPortfolio




// app.post('/blog/newpost')
function createPost( req, res ) {

	var auth = null;

	if( req.session.name ) {

		auth = true;

		var postTitle 	= req.body.title;
		var postContent = req.body.content;
		var postDate 	= req.body.date;
		var myPost 		= new post({

			title	: postTitle,
			content : postContent

		});// ends myPost

		myPost.save( function( err ) {

			if ( err ) {

				console.log('Error '+err);
				res.send('Error '+err);

			} else {

				res.render("newPost", 

				{

				loggedIn: auth

				});
			
			}

		});// ends myPost.save

	} else {

		res.redirect('/login');

	}

}// ends createPost




// app.post("/login")
function verify( req, res ) {

	var user	= req.body.username;
	var pw		= req.body.password;

	if( user === "reptar" ) {

		if( pw === "deannad28" ) {

			req.session.name = user;
			res.send( { redirect : '/' } );

			return;

		} else {

			res.send( 'Wrong password' );

			return;
		}

	} else {

		res.send( "Wrong User Name" );

		return;

	}

}// ends verify



// app.post("/")
function mail( post_obj, cb ) {

	var transport = nodemailer.createTransport("Sendmail");

	var mailOptions = 

	{
		from	: "ahndere@gmail.com",
		to	 	: "ahndere@gmail.com",
		subject : "Contact submission from www.derekahn.com",
		text	: "<p>name : " + post_obj.name + " </p><p>email : " + post_obj.email + "</p><p>message : " + post_obj.message + "</p>"

	}

	

	transport.sendMail( mailOptions, cb);


}

/*##############################  	GET EDIT	############################## */



// app.get("/blog/archive")
function oldPosts(req, res) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

	}

	post.find().sort({

		date: -1

	}).limit(6).exec(

	function( err, myOldPosts ) {

		if (err) {

			console.log('Error '+err);
			res.send('Error '+err);

		}
		res.render('archive', {

			loggedIn	: auth,
			posts		: myOldPosts

		}); // ends res.render

	}); // ends post.find

} // ends oldPosts



/*##############################  	PUT UPDATE	##############################*/


// app.put("/blog/archive")
function editMyPost( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

		var numId 		= req.body.id;
		var postTitle 	= req.body.title;
		var postContent = req.body.content;

		post.findOneAndUpdate({

			_id: numId	
		}, 
		{
			title 	: postTitle,
			content : postContent
		},

		function( err, obj ) {

			if ( err ) {

				console.log("error in edit meow "+err);
				res.send("Error"+err);

			}

			console.log("Post Has Been Edited");
			res.json(obj);

		});// ends post.findOneAndUpdate

	} else {

		res.redirect('/login');

	}

}// ends editMyPost 


// app.put("/portfolio")
function editMyPortfolio(req, res) {
	
	console.log("Inside editMyPortfolio");
	if ( req.session.name ) {

		var numId			 = req.body.id;
		var portfolioTitle	 = req.body.title;
		var portfolioContent = req.body.content;

		portfolio.findOneAndUpdate({ 

			_id: numId
		}, 
		{ 
			title	: portfolioTitle, 
			content : portfolioContent 
		},

		function ( err, obj ) {

			if ( err ) {

				console.log('Error '+err);
				res.send('Error '+err);

			} else {

				console.log('Portfolio Has Been Edited');
				res.json(obj);

			}

		});// portfolio.findOneAndUpdate

	} else {

		res.redirect('/login');

	}

}// ends editMyPortfolio



/* ############################## 	GET DELETE	##############################*/



// app.delete("/blog/:id")
function deletePost( req, res ) {

	var auth = null;

	if ( req.session.name ) {

		auth = true;

		var idNum = req.param('id');

		post.findOneAndRemove({

			_id: idNum

		}, 

		function( err ) {

			if ( err ) {

				console.log("Error "+err);
				res.send("Error "+err);

			}

			console.log("Deleted Post");
			res.send('Deleted Successfully');

		});

	} else {

		res.redirect('/login');

	}

}// ends deletePost



// app.delete('/portfolio/:id')
function deletePortfolio(req, res) {

	var auth = null;

	if(req.session.name) {

		auth = true;

		var idNum = req.param('id');

		portfolio.findOneAndRemove({

			_id: idNum

		}, 

		function(err) {

			if(err) {

				console.log( "Error "+err );
				res.send( 'Error '+err );

			} 

			console.log("deleted portfolio");
			res.send('Deleted Successfully');

		});

	} else {

		res.redirect('/login');

	}

}// ends deletePortfolio




/*######################################## 		ROUTE HANDLERS		#########################################*/




/*############################## 	GET SHOW	##############################*/


// This is just for XHR to view blog post //
app.get( "/blog/blogPost/:id", viewBlogPost );

// Calls the home page
app.get( "/", homePage );

// Calls the login page
app.get( "/login", myLogin );

// Calls the portfolio
app.get( "/portfolio", myPortfolio );

// Calls the about
app.get( "/about", aboutMe );

// Calls hack the planet!
app.get( "/hacktheplanet", myHackPlanet );

// Calls the Logout page
app.get( "/logout", endSession );



/*############################## 	GET NEW		##############################*/


// Calls the new post page
app.get( "/blog/newPost", newPost );


/*############################## 	POST CREATE		##############################*/


// Calls the portfolio to Post new
app.post( "/portfolio", addPortfolio );

// Calls the new post page so that it may POST
app.post( "/blog/newPost", createPost );

// Verifies User Name and Password
app.post( "/login", verify );

// For the contact form
app.post( "/", function(req, res) {

	mail( req.body, function(err, result){
		// only runs after mail is done async processing
		// cause we want to know that email was sent successfully (err is null)
		res.json({ success : (err==null) });
	} );

});


/*############################## 	GET EDIT 	##############################*/


// Calls the old posts
app.get( "/blog/archive", oldPosts );




/*############################## 	PUT UPDATE	##############################*/


// Calls the edit function for blog posts
app.put( "/blog/:id", editMyPost );

// Calls the edit function for portfolio posts
app.put( "/portfolio", editMyPortfolio );


/*############################## 	GET DELETE		##############################*/


// On the old posts page it deletes the current post
app.delete( '/blog/:id', deletePost );

// On the portfolio page it deletes the current post
app.delete( '/portfolio/:id', deletePortfolio );