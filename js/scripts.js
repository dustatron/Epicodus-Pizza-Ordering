//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = {
		cheese: 'img/cheese.png',
		pepperoni: 'img/cheese.png',
		artichoke: 'img/cheese.png',
		anchovy: 'img/cheese.png',
		bacon: 'img/cheese.png',
		glass: 'img/cheese.png'
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
};

Cart.prototype.addPizzaTopping = function(pizzaId, topping) {
	var toppingObject = {
		topping: 'img/cheese.png'
	};
	this.items[pizzaId].toppings.push(toppingObject);
	console.log('added ' + topping);
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
	const entries = Object.entries(pizzeria.toppings);
	let printString = '';

	entries.forEach((topping) => {
		printString +=
			'<div id="' +
			topping[0] +
			'" class="toppings-item"><p>' +
			topping[0] +
			'</p><img src="' +
			topping[1] +
			'" alt=""></div>';
	});

	$('.toppings-options').html(printString);
}

function drawSelectedToppings(currentPie) {
	const entries = Object.entries(currentPie);
	var printString = '';

	entries.toppings.forEach((topping) => {
		console.log(topping);
		printString +=
			'<div id="' +
			topping[0] +
			'" class="toppings-item"><p>' +
			topping[0] +
			'</p><img src="' +
			topping[1] +
			'" alt=""></div>';
	});

	$('.toppings--selected').html(printString);
}

////////////////////////////////////////
////////    Document Object    ////////
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
		drawToppings();
	});

	//toppings items
	$('.toppings-options').on('click', 'div', function() {
		var curPie = pizzeria.orders[that.currentOrder];
		curPie.addPizzaTopping(that.currentPizza, this.id);
		drawSelectedToppings(pizzeria.orders[that.currentOrder].items[that.currentPizza]);
	});
});
