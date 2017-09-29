var config = {
    apiKey: "AIzaSyABxJ2JgfsifPCSc9sWsJDqMHXBOAv6w5I",
    authDomain: "bootcoin-75095.firebaseapp.com",
    databaseURL: "https://bootcoin-75095.firebaseio.com",
    projectId: "bootcoin-75095",
    storageBucket: "bootcoin-75095.appspot.com",
    messagingSenderId: "974951314608"
  };
  firebase.initializeApp(config);

var database = firebase.database();



	var exchangeRates = [];
	var usPrice = [];
	var krwConversion = [];
	var usConversionA = [];
	var usRatios = [];
	var percentage = [];


// Currency exchange rate for KRW
	$.ajax({
		url: "https://www.apilayer.net/api/live?access_key=1ac8896495e4d0dcb2b9b34f5c3bef1b",
		method: "GET"
	}).done(function(response) {
		console.log(response);
		console.log("exchange currency rate " + response.quotes.USDKRW);

		var exchangeRate = response.quotes.USDKRW;

		exchangeRates.push(exchangeRate);

	});

function displayUSBTC() {

//US buy price 

	$.ajax({
	url: "https://blockchain.info/ticker",
	method: "GET"
}).done(function(response) {
	

	usBTC = response.USD.buy;

	$(".usExchange").empty();
	
	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Bitcoins at US sell price: $" + usBTC);

	curDiv.append(paraOne);

	usPrice.push(usBTC);

	$(".usExchange").prepend(curDiv);

	


	});


}


function displayUSETH() {

$.ajax({
	url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&e=Coinbase&extraParams=your_app_name",
	method: "GET"
}).done(function(response) {
	// console.log(response);
	// console.log(response.ETH.USD);

	result = response.ETH.USD;

	$(".usExchange").empty();
	
	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Ethereum at US sell price: $" + result);

	curDiv.append(paraOne);

	usPrice.push(result);

	$(".usExchange").prepend(curDiv);

	


	});

}


function displayKRBTC() {
// Korean BTC rate
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

	var paraOne = $("<p>").text("Bitcoins at Korean sell price: $" + usConversion.toFixed(4));

	curDiv.append(paraOne);

	$(".krwExchange").prepend(curDiv);

	
});



}

function displayKRETH() {
// Korean BTC rate
	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	console.log(response);
	console.log(response.data.sell_price);
	var result = response.data.sell_price;

	var usConversion = result/exchangeRates[0];

	usConversionA.push(usConversion);
	
	$(".krwExchange").empty();

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Ethereum at Korean sell price: $" + usConversion.toFixed(8));

	curDiv.append(paraOne);

	$(".krwExchange").prepend(curDiv);



	

});


}


function displayUS_BTCETH() {
$.ajax({


	url: "https://shapeshift.io/marketinfo/btc_eth",
	method: "GET"
}).done(function(response) {
	console.log("market shapeshift");
	console.log(response.rate);

	var result = response.rate;

	usRatios.push(result)




	$(".usExchange").empty();
	
	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("BTC/ETH at US sell price: " + result.toFixed(4));

	curDiv.append(paraOne);

	$(".usExchange").prepend(curDiv);

	

});


}



function displayUS_ETHBTC() {

$.ajax({
	url: "https://shapeshift.io/rate/eth_btc",
	method: "GET"
}).done(function(response) {
	console.log("shapeshift rate");
	console.log(response.rate);

	var result = response.rate;

	$(".usExchange").empty();
	
	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("ETH/BTC at US sell price: " + result);

	curDiv.append(paraOne);

	$(".usExchange").prepend(curDiv);

	


});



}

function displayKR_BTCETH() {
	$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	console.log("Korean BTC");
	console.log(response.data.sell_price);
	
	var BTC = response.data.sell_price;

	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	console.log("Korean ETH");
	console.log(response.data.sell_price);
	
	var ETH = response.data.sell_price;
	
	var koreanRatioB = BTC/ETH;
	
	
	console.log("Korean rate BTC/ETH: " + koreanRatioB);

	$(".krwExchange").empty();

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("BTC/ETH at Korean sell price: " + koreanRatioB.toFixed(4));

	curDiv.append(paraOne);

	$(".krwExchange").prepend(curDiv);

	
	

});
});
	
}

function displayKR_ETHBTC() {
	$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	console.log("Korean BTC");
	console.log(response.data.sell_price);
	
	var BTC = response.data.sell_price;

	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	console.log("Korean ETH");
	console.log(response.data.sell_price);
	
	var ETH = response.data.sell_price;
	
	var koreanRatioE = ETH/BTC;	
	
	
	console.log("Korean rate ETH/BTC: " + koreanRatioE);

	$(".krwExchange").empty();

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("ETH/BTC at Korean sell price: " + koreanRatioE.toFixed(8));

	curDiv.append(paraOne);

	$(".krwExchange").prepend(curDiv);
	
	
});

});

}
// =============================================================
// Comparison Button API's

// Bitcoin to Ethereum between markets 

function displayComparison()  {

$(".compare").empty();

$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	
	var BTC = (response.data.sell_price/exchangeRates[0]);

	console.log("Korean BTC " + BTC);

	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	console.log("Korean ETH");
	console.log(response.data.sell_price);
	
	var ETH = response.data.sell_price/exchangeRates[0];
	
	var koreanRatioB = BTC/ETH;	
	
	console.log("Korean rate BTC/ETH: " + koreanRatioB);

$.ajax({
	url: "https://shapeshift.io/marketinfo/btc_eth",
	method: "GET"
}).done(function(response) {
	console.log("us btc/eth " + response.rate);

	var usRatio = response.rate;


	var difference = Math.abs(koreanRatioB - usRatio);
	var average = (koreanRatioB + usRatio)/2;
	
	console.log("average: " + average);
	console.log("difference: " + difference);
	console.log((difference/average)*100);

	perDif = (difference/average)*100;

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("BTC/ETH US to Korean Difference: " + perDif.toFixed(4) + "%");

	curDiv.append(paraOne);

	$(".compare").prepend(curDiv);

	

	


});

});	

});



// Ethereum comparison between markets

	$.ajax({
	url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&e=Coinbase&extraParams=your_app_name",
	method: "GET"
}).done(function(response) {
	console.log(response);
	console.log(response.ETH.USD);

	var USETH = response.ETH.USD;

	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	console.log("Korean ETH");
	console.log(response.data.sell_price);
	
	var KRETH = response.data.sell_price;

	var usConversion = KRETH/exchangeRates[0];
	
	var difference = Math.abs(USETH - usConversion);
	var average = (USETH + usConversion)/2;

	var perDif = (difference/average)*100;
	
	
	console.log("Korean ETH over US ETH: " + perDif);

	

	curDiv = $("<div class='cur'>");

	var paraOne = $("<p>").text("Ethereum Difference: $" + difference.toFixed(4) + " Difference: " + perDif.toFixed(4) +"%");

	curDiv.append(paraOne);

	$(".compare").prepend(curDiv);

	


	
});

});



// Bitcoin Comparison between markets


	$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	console.log("Korean BTC");
	console.log(response.data.sell_price);
	
	var BTC = (response.data.sell_price/exchangeRates[0]);
	console.log("Korean BTC: " + BTC);

$.ajax({
	url: "https://blockchain.info/ticker",
	method: "GET"
}).done(function(response) {
	

	var usBTC = response.USD.buy;


	
	var difference = Math.abs(BTC - usBTC);
	var average = (usBTC + BTC)/2;

	

	console.log(average);
	
	console.log((difference/average)*100);

	
	perDif = (difference/average)*100;

	

	

	var curDiv = $("<div class='dif'>");

	var paraTwo = $("<p>").text("Bitcoin Difference: $" + difference.toFixed(4) + " Difference: " + perDif.toFixed(4) + "%");

	curDiv.append(paraTwo);



	$(".compare").prepend(curDiv);


});

});


}

// Firebase will log the percentage

var frCompare;

function logCompare() {
	frCompare = setInterval(firebaseComparison, 1000);
}

function firebaseComparison()  {


$.ajax({
	url: "https://api.bithumb.com/public/ticker/BTC",
	method: "GET"
}).done(function(response) {
	
	var BTC = (response.data.sell_price/exchangeRates[0]);


	$.ajax({
	url: "https://api.bithumb.com/public/ticker/ETH",
	method: "GET"
}).done(function(response) {
	
	var ETH = response.data.sell_price/exchangeRates[0];
	
	var koreanRatioB = BTC/ETH;	
	

$.ajax({
	url: "https://shapeshift.io/marketinfo/btc_eth",
	method: "GET"
}).done(function(response) {
	// console.log("us btc/eth " + response.rate);

	var usRatio = response.rate;


	var difference = Math.abs(koreanRatioB - usRatio);
	var average = (koreanRatioB + usRatio)/2;
	

	perDif = (difference/average)*100;


database.ref().set({
		BTCETHpercentage: perDif,
	});

event.preventDefault();

});

});

});

}

$(document).on("click", ".btc-us-btn", displayUSBTC);
$(document).on("click", ".eth-us-btn", displayUSETH);
$(document).on("click", ".btc_eth-us-btn", displayUS_BTCETH);
$(document).on("click", ".eth_btc-us-btn", displayUS_ETHBTC);
$(document).on("click", ".btc-sk-btn", displayKRBTC);
$(document).on("click", ".eth-sk-btn", displayKRETH);
$(document).on("click", ".btc_eth-sk-btn", displayKR_BTCETH);
$(document).on("click", ".eth_btc-sk-btn", displayKR_ETHBTC);
$(document).on("click", ".btn-compare", displayComparison);
$(document).on("click", ".btn-compare", logCompare);