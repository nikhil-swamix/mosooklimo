function AJAX(method = "GET", url = "", data = undefined, success, error, async = true) {
	return $.ajax({
		type: method,
		async: async,
		contentType: "application/json",
		url: url,
		data: JSON.stringify(data) || undefined,
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		},
		dataType: "json",
		success: success,
		error: error,
	});

}
window.AJAX = AJAX

function AjaxErrorHandler(data, textstatus, xhr) {
	if (data.responseJSON.message == "Not authorized, token failed") {
		window.location = './sign-in.html'
	}
}
window.AjaxErrorHandler = AjaxErrorHandler

// AJAX('/api/users/profile')
function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

function isAdmin() {
	$.ajax({
		type: "GET",
		url: '/api/users/profile',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		},
		dataType: "json",
		success: (data, textstatus, xhr) => {
			if (DEBUGGING) {
				console.log(data, 'test if user is admin')
			}
		},
		error: (data, textstatus, xhr) => {
			if (DEBUGGING == 0) {
				console.log("Unable to Check if user is authorized")
			}
			localStorage.removeItem('jwt')
			window.location = './sign-in.html'
		}
	});
}

$(document).ready(function() {
	$('[data-load]').each(function(index, el) {
		$.get($(el).attr('data-load'), function(data) {
			// console.log("LOADED SUCCESS",el)
			$(el).html(data)
		});
	});
});

if (!localStorage.getItem('jwt') && !window.location.href.includes('sign-up.html')) {
	alert('you need to login before you can use control panel')
	window.location = './sign-in.html'
}

if (window.location.href.includes('/admin')) {
	isAdmin()
}