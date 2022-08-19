let DEBUGGING=0


function refresh() {
	window.location=window.location
}

function AJAX(method="GET",url="",data=undefined,success,error,async=true){
	return $.ajax({
	  type: method,
	  contentType: "application/json",
	  url: url,
	  async:async,
	  data: data ? JSON.stringify(data) : undefined,
	  headers:{'Authorization':`Bearer ${localStorage.getItem('jwt')}`},
	  // dataType: "json",
	  success: success,
	  error: error,
	});
	
}
window.AJAX=AJAX

// AJAX('/api/users/profile')
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function tablify_json (json) {
	
}

function isAdmin (){
	$.ajax({
		type: "GET",
		// contentType: "application/json",
		url: '/api/users/profile',
		// data: JSON.stringify(data),
		headers:{'Authorization':`Bearer ${localStorage.getItem('jwt')}`},
		dataType: "json",
		success: (data,textstatus,xhr)=>{
			if (DEBUGGING) {
				console.log(data,'test if user is admin')
			}
			localStorage.setItem('isAdmin', data.isAdmin)
		},
		error: (data,textstatus,xhr)=>{
			if (DEBUGGING==0) {
				console.log("Unable to Check if user is admin")
			}
			// localStorage.removeItem('jwt')
			window.location='./sign-in.html'
		}
	});
}
isAdmin()

$(document).ready(function() {
	
	$('[data-load]').each(function(index, el) {
		$.get($(el).attr('data-load'), function(data) {
			// console.log("LOADED SUCCESS",el)
			$(el).html(data)
		});
	});

	bsSwal=Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	})

	// -----SWAL DEFAULT SETTINGS FOR TOAST-----
	window.Toast = Swal.mixin({
	  toast: true,
	  position: 'top',
	  showConfirmButton: false,
	  timer: 3000,
	  timerProgressBar: true,
	  didOpen: (toast) => {
	    toast.addEventListener('mouseenter', Swal.stopTimer)
	    toast.addEventListener('mouseleave', Swal.resumeTimer)
	  }
	})
});




if(!localStorage.getItem('jwt')){
  window.location='./sign-in.html'
  // alert('you need to login before you can use admin panel')
}

