//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = [
		{ name: 'cheese', img: 'img/cheese.png' },
		{ name: 'pepperoni', img: 'img/cheese.png' },
		{ name: 'artichoke', img: 'img/cheese.png' },
		{ name: 'anchovy', img: 'img/cheese.png' },
		{ name: 'bacon', img: 'img/cheese.png' },
		{ name: 'glass', img: 'img/cheese.png' }
	];
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
		toppings: [ toppings ], // should be array
		pizzaId: (pizzeria.pizzaId += 1)
	};
	this.items.push(pizza);
	document.currentPizza = pizza.pizzaId - 1;
};

Cart.prototype.addPizzaTopping = function(pizzaId, topping) {
	var toppingObject = {
		name: topping,
		img: 'img/cheese.png'
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
	// const entries = Object.entries(pizzeria.toppings);
	let printString = '';

	pizzeria.toppings.forEach((topping) => {
		printString +=
			'<div id="' +
			topping.name +
			'" class="toppings-item"><p>' +
			topping.name +
			'</p><img src="' +
			topping.img +
			'" alt=""></div>';
	});

	$('.toppings-options').html(printString);
}

function drawSelectedToppings(currentPie) {
	var printString = [];
	console.log(currentPie);

	currentPie.toppings.forEach((topping) => {
		printString.push(
			'<div id="' +
				topping.name +
				'" class="toppings-item"><p>' +
				topping.name +
				'</p><img src="' +
				topping.img +
				'" alt=""></div>'
		);
	});

	$('.toppings--selected').html(printString.join(''));
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
		cart.addPizza(this.id, { name: 'cheese', img: 'img/cheese.png' });
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
