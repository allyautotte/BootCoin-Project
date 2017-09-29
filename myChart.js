moment.locale('en');
function drawGraph(){
    var ctx = document.getElementById("myChart");
    Chart.defaults.global.animation.duration=1;
    var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xAxis,
            datasets: [
                { 
                  data: yAxis,
                  label: "bitcoin price (USD)",
                  borderColor: "#3e95cd",
                  fill: true,
                },
            ]
        }
    });
}
function buildGraph(response){
    var data = response.Data;
    // console.log(response);
    xAxis = [];
    for (var i = 0; i < data.length; i=i+5) {
        var time = data[i].time;
        var htime = new Date(time*1000);    
        // console.log(time);
        // console.log(htime);
        //adjTime=moment.tz(htime, "America/Los_Angeles");
        // convert to human readable date
        var humanTime = moment(htime).format("MM/DD/YY, hh:mm:ss a");
        xAxis.push(humanTime);
    }
    yAxis = [];
    for (var i = 0; i < data.length; i=i+5) {
        var closingPrice = data[i].close;   
        // console.log(closingPrice);
        // convert to human readable date
        yAxis.push(closingPrice);
    }
}
function updateGraph()
{
var curTime = Date.now();
// console.log('current time ='+curTime);
//var queryURL = "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG";
var queryURL = "https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&e=CCCAGG&toTs="+curTime;
//grabs the API giphy
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
    buildGraph(response);
    drawGraph();
});
// setInterval
// inside setInterval
    // ajax call
    // buildGraph (with response)
    // drawGraph
setTimeout( updateGraph, 5000)
}   
setTimeout( updateGraph, 100)