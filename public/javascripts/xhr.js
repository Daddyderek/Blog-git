$(document).ready(function() {

	console.log("JavaScript is working!");

	// Parallax for About //
	$('section[data-type="background"]').each( function() {
		
		var $window	= $(window);
		var $bgObj	= $( this ); // assigning the object

		$(window).scroll( function() {

			var yPos	= -($window.scrollTop() / $bgObj.data('speed') );
			var coords	= yPos + 'px';

			// Move the background
			$bgObj.css(

			{
				
				backgroundPosition				: "coords",
				"-webkit-background-size"		: "cover",
				"-moz-background-size"			: "cover",
				"-o-background-size"			: "cover",
				"background-size"				: "cover"

			});

		});// $(window).scroll

	}); // ends $('section[data-type="background"')

	$("#contact-form").submit( function(e) {

		e.preventDefault();

		var button = $(this);

		$.ajax( "/",

		{
			method		: 'POST',
			data 		: $('#contact-form').serialize(),
			dataType	: 'json',
			success		: function( data ) {

				if (data.success == true) {
					console.log("data is = "+data);
					$("#contactAlert").hide().removeClass("hidden").fadeIn("slow");
					$("#contact-form").remove();

				} else {

					$("#contactFail").fadeIn("slow").delay( 2000 ).fadeOut("slow");


				}

			}

		});

	});// $("button#cust-submit")






	// Validation flags for failed password/username attempts in "/login"//
	$('button.login').on('click', function(e) {

		e.preventDefault();

		var button = $(this);

		$.ajax( button.attr('href'), {

			url		 : '/login',
			method	 : "POST",
			data	 : $("#login").serialize(),
			dataType : 'json',
			success  : function(data) {

				if (typeof data.redirect == 'string') {
					
					window.location = data.redirect;

				}

			},//ends success:

			error: function(result) {

				$("#errorMessage").addClass("alert alert-danger");
				$("#errorMessage").html(result.responseText);

			}

		});// ends $.ajax

	});// ends $('button login')




	// Toggles the blue side nav-bar for mobile on "/" //
	$('[data-toggle=offcanvas]').click(function() {

		$('.row-offcanvas').toggleClass('active');
		
	}); // ends $('[data-toggle=offcanvas]')



	// Displays a blog post in a modal on "/" //
	$('.viewPostModal').on('click', function(e) {

		e.preventDefault();

		var button = $(e.currentTarget);
		var title = $(this).closest('.row1').find(".modalBlogPostTitle").html();

		$.ajax( "/blog/blogPost/" + button.data("id"), {

			method	: 'GET',
			dataType: 'json',
			success : function(data) {

				$('#myPostModalTitle').html(title);
				$('#myPostModalBody').val(button.id).append(data.content);

			}

		});
		
	});// ends $("#viewPostModal")




	// Creates a new blog post on "/blog/newPosts" //
	$('form#blogForm').on('submit', function(event) {

		event.preventDefault();

		$.ajax( '/blog/newPost', {

			method	: 'POST',
			data	: $('form#blogForm').serialize(),
			success : function(result) {

				$('form#blogForm').remove();
				$('#result').html('Your Post was successful');

			} // ends success:

		}); // ends $.ajax

	}); // ends $(form#blog).on




	// Create new post on "/portfolio" //
	$('form#portfolioForm').on('submit', function(event) {

		event.preventDefault();

		$.ajax( '/portfolio', {
			method	: 'POST',
			data	: $('form#portfolioForm').serialize(),
			success : function(result) {

				$('form#portfolioForm').remove();
				$('#resultPortfolio').html('Your Post was successful');

			} // ends success:

		}); // ends $.ajax

	}); // ends $(form#blog).on




	// Edits a blog post on "/blog/archive" //
	$('button.edit').on('click', function(e) {

		e.preventDefault();

		var id		= $(this).data('id');
		var title	= $( "h2[data-title-id='"+id+"']" ).html();
		var body	= $( "h4[data-content-id='"+id+"']" ).html();

		$('#titleEdit').val(title);

		$('#bodyEdit').val(body);

		$('#post_id').val(id);

		$("#modalEditForm").attr('data-editing-id', id);

	}); // ends $('button.edit')




	// Edits a post on "/portfolio" //
	$('button.edit2').on('click', function(e) {

		e.preventDefault();

		var id		= $(this).data('id');
		var title	= $( "h2[data-title-id='"+id+"']" ).html();
		var body	= $( "h4[data-content-id='"+id+"']" ).html();

		$('#titleEdit2').val(title);

		$('#bodyEdit2').val(body);

		$('#post_id2').val(id);

		$("#modalEditForm2").attr('data-editing-id', id);

	}); // ends $('button.edit')




	// Saves a post edited on "/blog/archive" //
	$("#modalSave").click(function(e) {

		e.preventDefault();

		var id = $("#modalEditForm").attr('data-editing-id');

		$.ajax( $('#modalEditForm').attr('action'), {

			method	: 'PUT',
			data	: $("#modalEditForm").serialize(),
			type	: 'json',
			success : function(result) {

				var $theTitle	= $( "h2[data-title-id='"+id+"']" );
				var $theContent = $( "h4[data-content-id='"+id+"']" );

				$theTitle.html( result.title );
				$theContent.html( result.content );

				$("button[data-dismiss='modal']").click();

			} // ends success

		}); // ends $.ajax

	}); // ends $('#modalSave')




	// Saves an edited post on "/portfolio" //
	$("#modalSave2").click(function(e) {

		e.preventDefault();

		var id = $("#modalEditForm2").attr('data-editing-id');

		console.log("$modaleEdit2 "+$('#modalEditForm2').attr('action'));

		$.ajax( $('#modalEditForm2').attr('action'), {

			method	: 'PUT',
			data	: $("#modalEditForm2").serialize(), // { id, title, content }
			type	: 'json',
			success : function(result) {

				var $theTitle	= $( "h2[data-title-id='"+id+"']" );
				var $theContent = $( "h4[data-content-id='"+id+"']" );

				$theTitle.html( result.title );
				$theContent.html( result.content );

				$("button[data-dismiss='modal']").click();

			} // ends success

		}); // ends $.ajax

	}); // ends $('#modalSave2')




	// Deletes a blog post on "/blog/archive" //
	$('button.delete').on('click', function(e) {

		e.preventDefault();

		var button = $(this);

		$.ajax( button.attr( 'href' ), {

			method	: 'DELETE',
			success : function(result) {

				button.closest('li').remove();

			} // ends success

		}); // ends $.ajax	

	}); // ends #delete




	// Deletes a post on "/portfolio" //
	$('button.delete2').on('click', function(e) {

		e.preventDefault();

		var button = $(this);

		$.ajax( button.attr('href'), {

			method	: 'DELETE',
			success : function(result) {

				button.closest('li').remove();

			} // ends success

		}); // ends $.ajax	

	}); // ends #delete



}); // ends $doc.ready