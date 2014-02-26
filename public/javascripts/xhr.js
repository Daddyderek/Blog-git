$(document).ready(function() {

	console.log("JavaScript is working!");

	// dispays blog in a modal //
	$('.viewBlogPosts').on('click', function(e) {
		e.preventDefault();
		var title = $(this).closest('.row2').find(".modalBlogPostTitle").html(),
			body = $(this).closest('.row2').find(".modalBlogPostBody").html();
		$('.modal-title').html(title);
		$('.modal-body').html(body);
		

	});// ends $("#viewPostModal")

	//displays failed password/username attempts //
	$('button.login').on('click', function(e) {
		var button = $(this);
		e.preventDefault();
		$.ajax(button.attr('href'), {
			url: '/login',
			method: "POST",
			data: $("#login").serialize(),
			dataType: 'json',
			success: function(data) {
				if(typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			},// ends success:
			error: function(result) {
				$("#errorMessage").addClass("alert alert-danger");
				$("#errorMessage").html(result.responseText);
			}
		});// ends $.ajax
	});// ends $('button login')


	// delete blog post //
	$('button.delete').on('click', function(e) {
		var button = $(this);
		e.preventDefault();
		$.ajax(button.attr('href'), {
			method: 'DELETE',
			success: function(result) {
				console.log("inside delete meow");
			button.closest('li').remove();
			} // ends success
		}); // ends $.ajax	
	}); // ends #delete



	// create new blog post //
	$('form#blogForm').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/home/newPost', {
			method: 'POST',
			data: $('form#blogForm').serialize(),
			success: function(result) {
				$('form#blogForm').remove();
				$('#result').html('Your Post was successful');
			} // ends success:
		}); // ends $.ajax
	}); // ends $(form#blog).on



	// Edit old blog posts //
	$('button.edit').on('click', function(e) {
		e.preventDefault();
		var title = $(this).closest('li').find('#postTitle h2').html();
		var body = $(this).closest("li").find('#postContent h4').html();
		var id = $(this).data('id');
		$('#titleEdit').val(title);
		$('#bodyEdit').val(body);
		console.log("I'm in XHR edited");
		$("#modalEditForm").attr('action', '/home/' + id);
	}); // ends $('button.edit')


	// Saves the edited post //
	$("#modalSave").click(function(e) {
		e.preventDefault();
		$.ajax($('#modalEditForm').attr('action'), {
			method: 'PUT',
			data: $("#modalEditForm").serialize(),
			success: function(result) {
				console.log(result);
			} // ends success
		}); // ends $.ajax
	}); // ends $('#modalSave')



	// toggle the blue side nav-bar //
	$('[data-toggle=offcanvas]').click(function() {
		console.log("i'm in data-toggle");
		$('.row-offcanvas').toggleClass('active');
	}); // ends $('[data-toggle=offcanvas]')

}); // ends $doc.ready