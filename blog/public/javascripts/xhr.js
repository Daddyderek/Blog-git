$(document).ready(function() {

	console.log("JavaScript is working!");

	// delete blog post
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



	// create new blog post
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



	// Edit old blog posts
	$('button.edit').on('click', function(e) {
		console.log("I'm inside edit meow");
		e.preventDefault();
		console.log($(this));
		console.log($(this).closest('form'));
		console.log($(this).closest('form').find('#postTitle h2'));
		var title = $(this).closest('form').find('#postTitle h2').html();
		var body = $(this).closest("form").find('#postContent h4').html();
			console.log(title);
			$('#titleEdit').val(title);
			$('#bodyEdit').val(body);
	}); // ends $('button.edit')



	// toggle the blue side nav-bar
	$('[data-toggle=offcanvas]').click(function() {
		console.log("i'm in data-toggle");
		$('.row-offcanvas').toggleClass('active');
	}); // ends $('[data-toggle=offcanvas]')

}); // ends $doc.ready