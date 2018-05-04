function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var idToken = googleUser.getAuthResponse().id_token;
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	$.ajaxSetup({
		beforeSend: function (xhr) {
			xhr.setRequestHeader("authentication", idToken);
		}
	});
	checkAdmin();
}



function signOut() {
	try {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			console.log('User signed out.');
		});
	} catch(e) {
		console.log(e);
	}
	window.location.href = '/'
}

function checkAdmin() {
	$.get('https://api.swoopit.xyz/web/auth', function (res) {
		console.log('Response:', res);
		if (res === "0") { // Not an admin
			if (window.location.pathname === '/') {
				return false;
			} else {
				M.toast({html: 'You are not an admin... Signing you out'});
				setTimeout(signOut, 3000);
			}
		} else if (res === '1' && window.location.pathname === '/login') { // Is an admin
			window.location.href = 'admin'
		} else {

		}
	});
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		['Email', 'Amount of People'],
		['HPA Emails',     11],
		['Other Emails',      2],
	]);

	var options = {
		title: 'SwoopIt User Emails'
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}