//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = {};
	this.pSizes = {};
	this.cartId = 0;
	this.pizzaId = 0;
}

Pizzeria.prototype.makeCartId = function() {
	this.cartId += 1;
	return this.cartId;
};

Pizzeria.prototype.addCart = function(cart) {
	cart.cartId = this.makeCartId();
	this.orders.push(cart);
};

//////////////////////////////////
////////// Cart Object //////////

function Cart() {
	this.items = [];
	this.toDeliver = false;
	this.total = 0;
}

Cart.prototype.makePizzaId = function() {
	pizzeria.pizzaId += 1;
	return pizzeria.pizzaId;
};

Cart.prototype.addPizza = function(size, toppings) {
	pizza = {
		size: size, // should me int
		toppings: toppings, // should be array
		pizzaId: (pizzeria.pizzaId += 1)
	};
	this.items.push(pizza);
};

var pizzeria = new Pizzeria();

$(document).ready(function() {
	console.log('JavaScipt is working');

	//on click function
	$('form').submit(function(event) {
		event.preventDefault();
		console.log('click');
	});
});
