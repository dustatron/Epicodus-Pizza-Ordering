//////////////////////////////////
//////// Pizzeria Object ////////
function Pizzeria() {
	this.orders = [];
	//Master Toppings data
	this.toppings = [
		{ name: 'Cheese', img: 'img/cheese-2.jpg' },
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
	this.basePrice = 20;
	this.toppingPrice = 3;
	this.state = function() {
		var index = this.cartId - 1;
		return this.orders[index];
	};
}

Pizzeria.prototype.makeCartId = function() {
	this.cartId += 1;
	return this.cartId;
};

Pizzeria.prototype.addToCart = function(cart) {
	cart.cartId = this.makeCartId();
	this.orders.push(cart);
	document.currentOrderIndex = cart.cartId - 1;
};

Pizzeria.prototype.find = function(id) {
	for (let i = 0; i < this.orders.length; i++) {
		if (this.orders[i] === id) {
			return this.orders[i];
		}
	}
};

Pizzeria.prototype.getTotalPrice = function() {
	var order = this.state();
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
};

Cart.prototype.deleteTopping = function(id) {
	var toppingsArr = pizzeria.state().items[pizzeria.pizzaId - 1].toppings;
	for (let i = 0; i < toppingsArr.length; i++) {
		if (toppingsArr[i]) {
			if (i == id) {
				toppingsArr.splice(i, 1);
				return true;
			}
		}
	}
	return false;
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

	currentPie.toppings.forEach((topping, index) => {
		printString.push(
			'<div id="' +
				topping.name +
				'" class="toppings-item"><p>' +
				topping.name +
				'</p><img src="' +
				topping.img +
				'" alt=""> <img id="' +
				index +
				'" class="trash" src="img/trash-can.svg"></div>'
		);
	});

	$('.toppings--selected').html(printString.join(''));
}

function writeTotal() {
	var totalObj = pizzeria.getTotalPrice(pizzeria.state());
	$('#pizzaNumber').html(totalObj.pies);
	$('#toppingsNumber').html(totalObj.toppings);
	$('#totalNumber').text(totalObj.total);
}

function writePizzaOrders() {
	var printArray = [];
	var order = pizzeria.state();
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
				'<p> 1' +
				' ' +
				item.size +
				' ' +
				'Pizza With  ' +
				item.toppings.length +
				toppings +
				'</div>'
		);
	});

	$('.show-pizzas-here').html(printArray.join(''));
}

function writeOrderHistory() {
	var printArray = [];

	pizzeria.orders.forEach((order) => {
		printArray.push(
			'<div class="order-history-item"> <div class="order-history-left"><img src="img/pizza-1.png"></div>'
		);
		order.items.forEach((item) => {
			printArray.push(
				'<div class="order-history-right"><h4>' +
					item.size +
					'</h4>' +
					item.toppings.length +
					'  Toppings </div>'
			);
		});
		printArray.push('</div></div>');
	});

	$('.order-history').html(printArray.join(''));
}

///////////////////////////////////////////
//////// Start Constructor Object ////////
var pizzeria = new Pizzeria();
var cart = new Cart();
pizzeria.addToCart(cart);

////////////////////////////////////////
////////    Document Object    ////////
$(document).ready(function() {
	this.currentOrderIndex;
	this.currentPizza;
	var that = this;

	//Pizza size Listen
	$('.pick-size--pizzas').on('click', 'div', function(event) {
		cart.addPizza(this.id, pizzeria.toppings[0]);

		//Setting up toppings view
		var curPie = pizzeria.state().items[that.currentPizza];
		$('.pick-size').hide();
		$('.toppings').show();
		// $('.toppings').attr('id', curPie.id);
		$('.toppings--pizza-title').text(curPie.size);
		drawToppings();
		drawSelectedToppings(pizzeria.state().items[that.currentPizza]);
	});

	//toppings items
	$('.toppings-options').on('click', 'div', function() {
		var curPie = pizzeria.orders[that.currentOrderIndex];
		curPie.addPizzaTopping(that.currentPizza, this.id);
		drawSelectedToppings(pizzeria.state().items[that.currentPizza]);
	});

	$('.toppings--selected').on('click', '.trash', function() {
		pizzeria.state().deleteTopping(this.id);
		drawSelectedToppings(pizzeria.state().items[that.currentPizza]);
	});

	//Buy pizza
	$('#buy-this-pizza').click(() => {
		$('.toppings').hide();
		$('.finish-order').show();
		writePizzaOrders();
		writeTotal();
	});

	//Delivery Button
	$('#delivery').click(() => {
		var order = pizzeria.state();
		if (order.toDeliver === 0) {
			order.toDeliver = 5;
			$('#deliveryNumber').html('Yes');
			writeTotal();
		} else if (order.toDeliver === 5) {
			order.toDeliver = 0;
			$('#deliveryNumber').html('No');
			writeTotal();
		} else {
			console.log('ERROR: Delivery Fee issue');
		}
	});

	//Complete Order Button
	$('#complete-btn').click(() => {
		$('.finish-order').hide();
		$('.order').show();
		writeOrderHistory();
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
		pizzeria.addToCart(cart);
		pizzeria.pizzaId = 0;
	});
});
