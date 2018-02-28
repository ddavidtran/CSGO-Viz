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
        else{
            B++;
        }
    })

    var jsonFormat = {
        "jsonarray": [{
            "team": "A",
            "wins": A
            }, {
            "team": "B",
            "wins": B
            }]
    }
    return jsonFormat;
}

var barChart = null; 

function chart(data) {
    //Clear chart if not null
    if(barChart) {
        barChart.destroy();
    }
    
    var newData = showWinSide(data);

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
            label: 'Wins',
            data: data,
            backgroundColor: 'rgba(120, 218, 254, 255)'
        }]
    },
    options: {
        legend:{
            display: false,
        },
        elements: {
            line: {
            tension: 0
            }
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
                bezierCurve: false
            }]
        }
    }
};  
    barChart = new Chart(ctx, config);
}