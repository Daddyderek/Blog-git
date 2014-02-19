$(document).ready(function() {
	console.log("JavaScript is working!");

	// create new blog post
	$('form').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/home/newPost', {
			type: 'POST',
			data: $('form').serialize(),
			success: function(result) {
				$('form').val("").remove();
				$('#result').html('Your Post was successful');
			} // ends success:
		}); // ends $.ajax
	}); // ends $(form).on

	// toggle the blue side nav-bar
	$('[data-toggle=offcanvas]').click(function () {
		console.log("i'm in data-toggle");
    $('.row-offcanvas').toggleClass('active');
  });// ends $('[data-toggle=offcanvas]')
}); // ends $doc.ready