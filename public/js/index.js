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
	} catch (e) {
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

if (window.location.pathname === '/admin') {
	google.charts.load('current', {'packages': ['corechart']});
	google.charts.setOnLoadCallback(drawChart);
}

async function drawChart() {
	var users = await getUsers();
	console.log(users);
	var incrementHPA = 0;
	var incrementNO = 0;
	for (var i = 0; i < users.length; i++) {
		if (users[i].email.endsWith('hpa.edu')) {
			incrementHPA++;
		} else {
			incrementNO++;
		}
	}
	var data = google.visualization.arrayToDataTable([
		['Email', 'Amount of People'],
		['HPA Emails', incrementHPA],
		['Other Emails', incrementNO],
	]);

	var options = {
		title: 'SwoopIt User Emails'
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}


async function getCategories() {
	return $.get('https://api.swoopit.xyz/web/categories');
}

async function getItems() {
	return $.get('https://api.swoopit.xyz/web/items');
}

async function getStores() {
	return $.get('https://api.swoopit.xyz/web/stores');
}

async function getUsers() {
	return $.get('https://api.swoopit.xyz/web/users');
}

function addItem(name, price, category, img) {
	console.log(name, price, category, img);
	$.ajax({
		method: 'post',
		url: 'https://api.swoopit.xyz/web/item',
		data: {
			name: name,
			price: price,
			category: category,
			img: img
		},
		success: function (res) {
			if (res === '0') return M.toast({html: 'There was an error adding this item'});
			M.toast({html: 'The Item has been successfully added!'})
		}
	})
}

function getCategory(id) {
	for (var i = 0; i < categories.length; i++)
		if (categories[i].id == id)
			return categories[i];
	return null;
}

var categories, items;
var storeNames = {
	mcd: 'McDonald\'s',
	fdl: 'Foodland',
	dom: 'Dominos',
	lnl: 'L&L Barbecue',
	bgk: 'Burger King',
	longs: 'Longs Drugs',
	csc: 'Costco'
};

function addCategory(name, store) {
	console.log(name, store);
	$.ajax({
		method: 'post',
		url: 'https://api.swoopit.xyz/web/category',
		data: {
			name: name,
			store: store,
		},
		success: function (res) {
			if (res === '0') return M.toast({html: 'There was an error adding this category'});
			M.toast({html: 'The category has been successfully added!'})
		}
	})
}