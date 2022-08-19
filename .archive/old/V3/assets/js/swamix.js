import 'https://code.jquery.com/jquery-3.6.0.min.js'
$(document).ready(function() {
	$('[data-load]').each(function(index, el) {
		$.get($(el).attr('data-load'), function(data) {
			// console.log("LOADED SUCCESS",el)
			$(el).html(data)
		});
	});
});