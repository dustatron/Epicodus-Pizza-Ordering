//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	this.toppings = [
		{ name: 'Cheese', img: 'img/cheese.png' },
		{ name: 'Pepperoni', img: 'img/pepperoni.jpg' },
		{ name: 'Artichoke', img: 'img/anchovy.jpeg' },
		{ name: 'Anchovy', img: 'img/artichoke.jpg' },
		{ name: 'Bacon', img: 'img/bacon.jpeg' },
		{ name: 'Olives', img: 'img/olives.jpeg' }
	];
	this.pSizes = {
		large: 18,
		medium: 14,
		small: 12,
		xsmall: 2
	};
	this.cartId = 0;
	this.pizzaId = 0;
	(this.basePrice = 20), (this.toppingPrice = 3);
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

Pizzeria.prototype.getTotalPrice = function(orderId) {
	var order = this.orders[orderId];
	var numberOfToppings = 0;
	var numberOfPies = order.items.length;
	var deliveryPrice = order.toDeliver;

	order.items.forEach((item) => {
		item.toppings.forEach((top) => {
			numberOfToppings += 1;
		});
	});
	var returnObj = {
		total: this.basePrice * numberOfPies + numberOfToppings * this.toppingPrice + deliveryPrice,
		pies: numberOfPies,
		toppings: numberOfToppings
	};

	return returnObj;
};

//////////////////////////////////
////////// Cart Object //////////
function Cart() {
	this.items = [];
	this.toDeliver = 0;
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
	var toppingObject;
	for (let i = 0; i < pizzeria.toppings.length; i++) {
		if (pizzeria.toppings[i].name === topping) {
			toppingObject = pizzeria.toppings[i];
		}
	}

	pizzeria.orders[this.cartId - 1].items[pizzaId].toppings.push(toppingObject);
	console.log('added ' + topping);
};

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

function writeTotal(obj) {
	var totalObj = pizzeria.getTotalPrice(obj);
	console.log(totalObj);
	$('#pizzaNumber').html(totalObj.pies);
	$('#toppingsNumber').html(totalObj.toppings);
	$('#totalNumber').text(totalObj.total);
}

function writePizzaOrders(thisOrder) {
	var printArray = [];
	var order = pizzeria.orders[thisOrder];
	order.items.forEach((item) => {
		var toppings;
		if (item.toppings.length <= 1) {
			toppings = ' Topping </p>';
		} else {
			toppings = ' Toppings </p>';
		}
		printArray.push(
			'<div class="pizza-order">' +
				'<img src="img/pizza-1.png">' +
				'<p> One' +
				' ' +
				item.size +
				' ' +
				'Pizza With  ' +
				item.toppings.length +
				toppings +
				'</div>'
		);
		console.log(item);
	});

	$('.show-pizzas-here').html(printArray.join(''));
}

////////////////////////////////////////
//////// Start Pizzeria Object ////////
var pizzeria = new Pizzeria();
var cart = new Cart();

////////////////////////////////////////
////////    Document Object    ////////
$(document).ready(function() {
	$('.finish-order').hide();
	this.currentOrder;
	this.currentPizza;
	var that = this;

	//Pizza size Listen
	$('.pick-size--pizzas').on('click', 'div', function(event) {
		cart.addPizza(this.id, { name: 'cheese', img: 'img/cheese.png' });
		pizzeria.addToCart(cart);

		//Setting up topping view
		var curPie = pizzeria.orders[that.currentOrder].items[that.currentPizza];
		$('.pick-size').hide();
		$('.toppings').show();
		// $('.toppings').attr('id', curPie.id);
		$('.toppings--pizza-title').text(curPie.size);
		drawToppings();
		drawSelectedToppings(pizzeria.orders[that.currentOrder].items[that.currentPizza]);
	});

	//toppings items
	$('.toppings-options').on('click', 'div', function() {
		var curPie = pizzeria.orders[that.currentOrder];
		curPie.addPizzaTopping(that.currentPizza, this.id);
		drawSelectedToppings(pizzeria.orders[that.currentOrder].items[that.currentPizza]);
	});

	//Buy pizza
	$('#buy-this-pizza').click(() => {
		$('.toppings').hide();
		$('.finish-order').show();
		writePizzaOrders(that.currentOrder);
		writeTotal(that.currentOrder);
	});

	//Delivery Button
	$('#delivery').click(() => {
		console.log(pizzeria.orders[that.currentOrder].toDeliver);
		console.log(pizzeria.orders[that.currentOrder]);
		var order = pizzeria.orders[that.currentOrder];

		if (order.toDeliver === 0) {
			order.toDeliver = 5;
			$('#deliveryNumber').html('Yes');
			writeTotal(that.currentOrder);
		} else if (order.toDeliver === 5) {
			order.toDeliver = 0;
			$('#deliveryNumber').html('No');
			writeTotal(that.currentOrder);
		} else {
			console.log('ERROR: Delivery Fee issue');
		}
	});

	//Complete Order Button
	$('#complete-btn').click(() => {
		$('.finish-order').hide();
		$('.order').show();
	});

	//Add Another Pizza
	$('#add-pizza').click(() => {
		$('.finish-order').hide();
		$('.pick-size').show();
	});

	$('#new-order').click(() => {
		$('.order').hide();
		$('.pick-size').show();
		cart = new Cart();
		pizzeria.pizzaId = 0;
	});
});
