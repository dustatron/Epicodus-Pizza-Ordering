//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = {
		cheese: 'img/cheese.jpeg',
		pepperoni: 'img/cheese.jpeg',
		artichoke: 'img/artichoke',
		anchovy: 'img/anchovy',
		bacon: 'img/bacon'
	};
	this.pSizes = {
		large: 18,
		medium: 14,
		small: 12,
		xsmall: 2
	};
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

Pizzeria.prototype.find = function(id) {
	for (let i = 0; i < this.orders.length; i++) {
		if (this.orders[i] === id) {
			return this.orders[i];
		}
	}
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

Cart.prototype.toDeliver = function(option) {
	this.toDeliver = option;
};

var pizzeria = new Pizzeria();

$(document).ready(function() {
	console.log('JavaScipt is working');
});
