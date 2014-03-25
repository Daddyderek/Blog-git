$(document).ready(function() {

	console.log("JavaScript is working!");


	// Edit portfolio posts //
	$('button.edit2').on('click', function(e) {

		e.preventDefault();

		var title	= $(this).closest('li').find('#portfolioTitle h2').html();
		var body	= $(this).closest("li").find('#portfolioContent h4').html();
		var id		= $(this).data('id');

		$('#titleEdit2').val(title);

		$('#bodyEdit2').val(body);

		$("#modalEditForm2").attr('action', '/home/' + id);

	}); // ends $('button.edit')




	// delete portfolio post //
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




	// create new portfolio post //
	$('form#portfolioForm').on('submit', function(event) {

		event.preventDefault();

		$.ajax( '/home/portfolio', {
			method	: 'POST',
			data	: $('form#portfolioForm').serialize(),
			success : function(result) {

				$('#resultPorfolio').html('Your Post was successful');

			} // ends success:

		}); // ends $.ajax

	}); // ends $(form#blog).on




	// Displays blog in a modal //
	$('.viewPostModal').on('click', function(e) {

		e.preventDefault();

		var button = $(e.currentTarget);
		var title = $(this).closest('.row1').find(".modalBlogPostTitle").html();

		$.ajax( "/blogPost/" + button.data("id"), {

			method	: 'GET',
			dataType: 'json',
			success : function(data) {

				$('#myPostModalTitle').html(title);
				$('#myPostModalBody').val(button.id).html(data.content);

			}

		});
		
	});// ends $("#viewPostModal")




	//displays failed password/username attempts //
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




	// delete blog post //
	$('button.delete').on('click', function(e) {

		e.preventDefault();

		var button = $(this);
		console.log("this= "+$(this));

		$.ajax( button.attr('href'), {

			method	: 'DELETE',
			success : function(result) {

				button.closest('li').remove();

			} // ends success

		}); // ends $.ajax	

	}); // ends #delete




	// create new blog post //
	$('form#blogForm').on('submit', function(event) {

		event.preventDefault();

		$.ajax( '/home/newPost', {

			method	: 'POST',
			data	: $('form#blogForm').serialize(),
			success : function(result) {

				$('form#blogForm').remove();
				$('#result').html('Your Post was successful');

			} // ends success:

		}); // ends $.ajax

	}); // ends $(form#blog).on




	// Edit old blog posts //
	$('button.edit').on('click', function(e) {

		e.preventDefault();

		var id		= $(this).data('id');
		var title	= $( "h2[data-title-id='"+id+"']" ).html();
		var body	= $( "h4[data-content-id='"+id+"']" ).html();

		$('#titleEdit').val(title);

		$('#bodyEdit').val(body);

		$('#post_id').val(id);

		console.log("this is post_id "+$('#post_id').val());
		console.log("titile "+title);
		console.log("body "+body);

		$("#modalEditForm").attr('data-editing-id', id);

	}); // ends $('button.edit')




	// Saves the edited post //
	$("#modalSave").click(function(e) {

		e.preventDefault();

		var id = $(this).data('id');

		$.ajax( $('#modalEditForm').attr('action'), {

			method	: 'PUT',
			data	: $("#modalEditForm").serialize(),
			type 	: 'json',
			success : function(result) {

				var $theTitle 	= $( "h2[data-title-id="+id+"]" );
				var $theContent = $( "h4[data-content-id="+id+"]" );

				console.log("title "+$theTitle);
				console.log("content "+$theContent);
				console.log("result= "+result);

				$theTitle.html( result.title );
				$theContent.html( result.content );

			} // ends success

		}); // ends $.ajax

	}); // ends $('#modalSave')




	// toggle the blue side nav-bar //
	$('[data-toggle=offcanvas]').click(function() {

		$('.row-offcanvas').toggleClass('active');
		
	}); // ends $('[data-toggle=offcanvas]')




}); // ends $doc.ready