/************************
 * Function Definitions *
 * **********************
 * function showWinSide(data): Calculate number of wins for each side (Counter-Terrorist and Terrorist).
 * function mostPlantedSites(data): Calculate number of times a bomb has been planted for each bomb site (A or B).
 * function chart(data): Draw the bar chart.
 */

var barChart = null; 


function showWinSide(data){
    var ctWins = 0;
    var tWins = 0;
    data.map(function(d){
        if(d.winner_side == "Terrorist"){
            tWins++;
        }
        else{
            ctWins++;
        }
    })

    var jsonFormat = {
        "jsonarray": [{
            "team": "Counter-Terrorist",
            "wins": ctWins
            }, {
            "team": "Terrorist",
            "wins": tWins
            }]
    }
    return jsonFormat;
}

function mostPlantedSites(data){
    var A = 0;
    var B = 0;
    data.map(function(d){
        if(d.bomb_site == "A"){
            A++;
        }
        else if(d.bomb_site == "B"){
            B++;
        }
    })

    var jsonFormat = {
        "jsonarray": [{
            "site": "A",
            "bomb": A
            }, {
            "site": "B",
            "bomb": B
            }]
    }
    return jsonFormat;
}

function chart(jsonData) {
    //Clear chart if not null
    if(barChart) {
        barChart.destroy();
    }

    var title_text = "CT OR T MAP?";
    var data_label = "Wins"

    var newData = showWinSide(jsonData);
    var labels = newData.jsonarray.map(function(e) {
        return e.team;
    });
    var data = newData.jsonarray.map(function(e) {
        return e.wins;
    });


    var ctx = canvas.getContext('2d');
    var config = {    
        type: 'bar',
    data: {
        labels: labels,
        data: data,
        datasets: [{
            label: data_label,
            data: data,
            backgroundColor: 'rgba(120, 218, 254, 255)'
        }]
    },
    options: {
        title: {
            display: true,
            fontColor: "white",
            text: title_text,
            fontSize: 20,
        },
        legend:{
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                },
                gridLines: {
                    display: false,
                        drawBorder: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontSize: 16,
                    beginAtZero:true,
                    fontColor: "white",
                },
            }]
        }
    }
}; 
    barChart = new Chart(ctx, config);

    document.getElementById("wins").onclick= function(){
        var newData = showWinSide(jsonData);
        var labels = newData.jsonarray.map(function(e) {
            return e.team;
        });
        var data = newData.jsonarray.map(function(e) {
            return e.wins;
        });

        var wins_chart = barChart.config.data;
        wins_chart.labels = labels;
        wins_chart.data.data = data;
        wins_chart.datasets[0].data = data;
        barChart.config.options.title.text = "CT OR T MAP?"
        barChart.update();
    }

    document.getElementById("bomb").onclick= function(){
        var newData = mostPlantedSites(jsonData);
        var labels = newData.jsonarray.map(function(e) {
            return e.site;
        });
        var data = newData.jsonarray.map(function(e) {
            return e.bomb;
        });

        var bomb_chart = barChart.config.data;
        bomb_chart.labels = labels;
        bomb_chart.data.data = data;
        bomb_chart.datasets[0].data = data;

        barChart.config.options.title.text = "BEST SITE TO PLANT BOMB";
        barChart.update();
    }

}