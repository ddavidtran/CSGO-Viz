
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



function chart(data) {

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
        datasets: [{
            label: 'Winning side',
            data: data,
            backgroundColor: 'rgba(120, 218, 254, 255)'
        }]
    },
    options: {

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
                    beginAtZero:true,
                },
                bezierCurve: false
            }]
        }
    }
};
    var chart = new Chart(ctx, config);
}