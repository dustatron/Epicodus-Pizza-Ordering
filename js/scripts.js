//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = {
		cheese: 'img/cheese.png',
		pepperoni: 'img/cheese.png',
		artichoke: 'img/cheese.png',
		anchovy: 'img/cheese.png',
		bacon: 'img/cheese.png'
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

Pizzeria.prototype.addToCart = function(cart) {
	cart.cartId = this.makeCartId();
	this.orders.push(cart);
	document.currentOrder = cart.cartId - 1;
	console.log('cart added to pizzeria with card it = ' + document.currentOrder);
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
	document.currentPizza = pizza.pizzaId - 1;
	console.log('Pizza created with id = ' + document.currentPizza);
};

Cart.prototype.addPizzaTopping = function(id, topping) {
	this.items[id].toppings.push(topping);
};

Cart.prototype.toDeliver = function(option) {
	this.toDeliver = option;
};

////////////////////////////////////////
//////// Start Pizzeria Object ////////
var pizzeria = new Pizzeria();

//////////////////////////////////
//////// Draw Functions  ////////

function drawToppings() {
	pizzeria.toppings;
}

$(document).ready(function() {
	this.currentOrder;
	this.currentPizza;
	var that = this;

	//Pizza size Listen
	$('.pick-size--pizzas').on('click', 'div', function(event) {
		console.log(this.id);
		var cart = new Cart();
		cart.addPizza(this.id, [ 'cheese' ]);
		pizzeria.addToCart(cart);

		//Setting up topping view
		var curPie = pizzeria.orders[that.currentOrder].items[that.currentPizza];
		$('.pick-size').hide();
		$('.toppings').show();
		$('.toppings').attr('id', curPie.id);
		$('.toppings--pizza-title').text(curPie.size);
	});

	//toppings items
	$('.toppings-options').on('click', 'div', function() {
		console.log(this.id);
	});
});
