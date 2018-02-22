var jsonfile = {
    "jsonarray": [{
        "name": "Hej",
        "age": 120
        }, {
        "name": "Hej",
        "age": 50
        },
        {
          "name": "Hej",
          "age": 130
        }]
    };
    
    //TODO: Set to auto read current map json and plot data
    //auto set labels and data 

    var labels = jsonfile.jsonarray.map(function(e) {
        return e.name;
    });
    var data = jsonfile.jsonarray.map(function(e) {
        return e.age;
    });;
      
    var ctx = canvas.getContext('2d');
    var config = {
    pointDotRadius: 3,
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Grafens graf',
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