$( document ).ready(function() {

	var govCurrency = ["USD"];
	var exchangeRates = [];
	var usPrice = [];


function displayPrice() {

	// var currency = $(this).attr("data-name");
	// console.log(currency);

	// var value = $("#value-input").val().trim();

	// var queryURL = "https://blockchain.info/tobtc?currency=" + currency + "&value=" + value;
	


	$.ajax({
	url: "https://blockchain.info/ticker",
	method: "GET"
}).done(function(response) {
	
	console.log(response.USD.sell);

	result = response.USD.sell;

	var currency = $(this).attr("data-name");
	console.log(currency);

	$(".usExchange").empty();
	
	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Bitcoins at US sell price: " + result);

	curDiv.append(paraOne);

	usPrice.push(result);

	$(".usExchange").prepend(curDiv);




	});


	
	$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	console.log(response);
	console.log(response.data.sell_price);
	var result = response.data.sell_price;

	var usConversion = result/exchangeRates[0];
	$(".krwExchange").empty();

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Bitcoins at Korean sell price: " + usConversion);

	
	var difference = usConversion - usPrice[0];
	var average = (usConversion + usPrice[0])/2;
	priceDif = Math.abs(difference);

	console.log(average);
	console.log(Math.abs(priceDif));
	console.log((priceDif/average)*100);

	
	perDif = (priceDif/average)*100;

	var dif = $("<div class='dif'>");

	var paraTwo = $("<p>").text("Price Differece: " + "$" + priceDif.toFixed(4) + "   Percentage difference: " + perDif.toFixed(4) + "%");

	dif.append(paraTwo);

	$(".difference").append(dif);

	curDiv.append(paraOne);

	$(".krwExchange").prepend(curDiv);





});
	

	
	$.ajax({
	url: "http://www.apilayer.net/api/live?access_key=1ac8896495e4d0dcb2b9b34f5c3bef1b",
	method: "GET"
}).done(function(response) {
	console.log(response);
	console.log("exchange currency rate " + response.quotes.USDKRW);

	var exchangeRate = response.quotes.USDKRW;

	exchangeRates.push(exchangeRate);

});

}


function renderButtons() {

	$("#currencyButtons").empty();

	for (var i = 0; i < govCurrency.length; i++) {

		var a = $("<button>");

		a.addClass("btn");

		a.attr("data-name", govCurrency[i]);

		a.text(govCurrency[i]);

		$("#currencyButtons").append(a);
	}
}
	


	

$("#submit").on("click", function(event) {

	event.preventDefault();

	var currency = $("#currency-input").val().trim();

	currencies.push(currency);
	renderButtons();


});

// $("#submit").on("click", function(event) {

// 	event.preventDefault();

// 	var value = $("#value-input").val().trim();




// });

$(document).on("click", "button", displayPrice);

renderButtons();

});