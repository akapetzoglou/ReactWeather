var names = ['Andrew', 'Julie', 'Jen'];
/*
names.forEach(function (name) {
	console.log('forEach', name);
});

names.forEach((name) => {
	console.log('arrowFunc', name)
} );


names.forEach((name) => console.log(name));

var returnMe = (name) => name + '!';
console.log(returnMe('Tasos'));

var person = {
	name: 'Tasos',
	greet: function () {
		names.forEach((name) => {
			console.log(this.name + ' says hi to ' + name)
		});
	}
}

person.greet();
*/

//In order to use arrow functions you HAVE TO use an anonymous function.
//The arrow functions don't update the 'this' keyword

//Challenge Area

function add (a, b) {
	return a + b;
}

// addStatement
var addStatement = (a, b) => {
	return a + b;
}

//addExpression

var addExpression = (a,b) => a+b;

console.log(addExpression(1,3));

console.log(addExpression(9,2));

//Create two different arrow functions.

