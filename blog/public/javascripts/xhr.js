$(document).ready(function() {
	console.log("JavaScript is working!");

	// delete blog post
	$('button.delete').on('click', function(e) {
		var button = $(this);
		e.preventDefault();
		console.log("in delete");
		$.ajax(button.attr('href'), {
			method: 'DELETE',
			success: function(result) {
				console.log("inside delete meow");
				button.fadeOut('fast');
			}// ends success
		});// ends $.ajax	
	});// ends #delete

	// create new blog post
	$('form#blogForm').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/home/newPost', {
			method: 'POST',
			data: $('form#blogForm').serialize(),
			success: function(result) {
				$('form#blogForm').html("");
				$('#result').html('Your Post was successful');
			} // ends success:
		}); // ends $.ajax
	}); // ends $(form#blog).on


	// toggle the blue side nav-bar
	$('[data-toggle=offcanvas]').click(function () {
		console.log("i'm in data-toggle");
    $('.row-offcanvas').toggleClass('active');
  });// ends $('[data-toggle=offcanvas]')

}); // ends $doc.ready