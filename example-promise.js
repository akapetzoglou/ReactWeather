//Calback pattern

function getTempCallback (location, callback) {
	callback(undefined, 78);
	callback('City not found');
}

getTempCallback('Philadelphia', function (err, temp) {
	if(err) {
		console.log('error', err);
	} else {
		console.log('success', temp);
	}
});

//Promise pattern

function getTempPromise (location) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(79);
			reject('City not found');
		}, 1000);
	});
}

getTempPromise('Philadelphia').then(function (temp) {
	console.log('promise success', temp);
}, function (err) {
	console.log('promise failed', err);
});

//Chalenge Promise

function addPromise (a, b) {
	return new Promise(function (resolve, reject) {
		if( typeof a === 'number' && typeof b === 'number') {
			resolve(a+b);
		} else {
		reject('Wrong format');
		}
	});
}

addPromise(3,34).then(function (sum) {
	console.log('Komple ola manito:', sum);
	}, function (err) {
		console.log('Skata ola manito', err);
	});

addPromise(3,'123123seagsdg').then(function (temp) {
	console.log('Komple ola manito:', temp);
	}, function (err) {
		console.log('Skata ola manito', err); 
});