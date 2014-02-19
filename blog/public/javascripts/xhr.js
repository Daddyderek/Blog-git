$(document).ready(function() {
	console.log("JavaScript is working!");

	// create new blog post
	$('form').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/home/newPost', {
			type: 'POST',
			data: $('form').serialize(),
			success: function(result) {
				$('form input').val("");
				$('#result').html('Your Post was successful');
			}// ends success:
		});// ends $.ajax
	});// ends $(form).on
});// ends $doc.ready