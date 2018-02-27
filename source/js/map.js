function getMax(hash_map){
    var currMax = 0;
    var num;

    Object.keys(hash_map).forEach(function (i){
        num = hash_map[i];
        if(num > currMax){
            currMax = num;
        }
    })
    return currMax
}

function getMin(hash_map){
    var currMin = Infinity;
    var num;

    Object.keys(hash_map).forEach(function (i){
        num = hash_map[i];
        if(num < currMin){
            currMin = num;
        }
    })
    return currMin;
}

function normalize (val, max, min) { return (val - min) / (max - min); }

function transformData(data){
    var points = [];
    data.forEach(function(d){
        points.push({
            "x": +d.vic_pos_x,
            "y": +d.vic_pos_y
        });
    })
    return points;
}

function convertCoordinates(data, currentMap, mapData, width, height){
    var resX = width;
    var resY = height;
    var newData = data;
    var i = 0;
    newData.forEach(function(d){
        if(mapData.map == d.map && mapData.map == currentMap){
            d.att_pos_x = parseFloat(resX * ( (d.att_pos_x - mapData.StartX) / (mapData.EndX - mapData.StartX)));
            d.att_pos_y = parseFloat(resY * ( (d.att_pos_y - mapData.StartY) / (mapData.EndY - mapData.StartY)));

            d.vic_pos_x = parseFloat(resX * ( (d.vic_pos_x - mapData.StartX) / (mapData.EndX - mapData.StartX)));
            d.vic_pos_y = parseFloat(resY * ( (d.vic_pos_y - mapData.StartY) / (mapData.EndY - mapData.StartY)));
        }
    });
    return newData;
  }

function drawPoints(data, width, height){
    var x = d3.scaleLinear().range([0, width]).domain([0,width]);
    var y = d3.scaleLinear().range([height, 0]).domain([0,height]);
    var t_data = transformData(data);

    if(document.getElementById("awpDraw") != null){
        d3.selectAll("#awpDraw").remove();
    }
    var circles = svg.selectAll(".circle")
        .data(data)
        .enter().append("circle")
        .attr("id", "circles")
        .attr("r",3) //Radius of the dot.
        .attr("cx", function(d,j) { return x(d["vic_pos_x"]); }) // x-axis coordinate of the center of the element.
        .attr("cy", function (d,j) { return y(d["vic_pos_y"]); }) // y-axis coordinate of the center of the element.
        .style('fill', "red")
        .style("stroke-width", 1)
        .style("stroke", "black")



    //DBScan. Density-based spatial clustering of applications with noise.
    document.getElementById("dbscan").onclick = function(){
        document.getElementById("awp_camp").disabled = true;

        var dbscanner = jDBSCAN().eps(32.68).minPts(95).distance('EUCLIDEAN').data(t_data);
        var point_assignment_result = dbscanner();

        var hashMap = {};
        point_assignment_result.forEach(function(d){
            hashMap[d] = hashMap[d] ? hashMap[d] + 1 : 1; //Check if cluster exists in hashMap.
        })
        var arr = Object.values(hashMap);
        var min = Math.min(...arr);
        var max = Math.max(...arr);

        //console.log(point_assignment_result);
        var normValue = 0;
        if(document.getElementById("circles") != null){
            d3.selectAll("circle")
                .style("visibility", "visible")
                .style('fill', function(d,j){
                        normValue = Math.floor(normalize(hashMap[point_assignment_result[j]], max, min));
                        if(normValue == 0){
                            return "red";
                        }
                        else{
                            d3.select(this)
                                .style("opacity", 0);
                        }
                    })
        }  
    }

    document.getElementById("CT").onclick = function(){
        d3.selectAll("circle")
        .attr("cx", function(d) { 
            if(d["vic_side"] == "CounterTerrorist"){
            return x(d["vic_pos_x"]); 
            }
        }) // x-axis coordinate of the center of the element.
        .attr("cy", function (d,j) { 
            if(d["vic_side"] == "CounterTerrorist"){
                return y(d["vic_pos_y"]); 
                }
        }) // y-axis coordinate of the center of the element.
        .style('fill', "red");
    }

    document.getElementById("T").onclick = function(){
        d3.selectAll("circle")
        .attr("cx", function(d) { 
            if(d["vic_side"] == "Terrorist"){
            return x(d["vic_pos_x"]); 
            }
        }) // x-axis coordinate of the center of the element.
        .attr("cy", function (d) { 
            if(d["vic_side"] == "Terrorist"){
                return y(d["vic_pos_y"]); 
                }
        }) // y-axis coordinate of the center of the element.
        .style('fill', "red");
    }

    document.getElementById("awp_camp").onclick = function(){
        d3.selectAll("circle")
        .style("visibility", "hidden");

        document.getElementById("dbscan").disabled = true;
        document.getElementById("CT").disabled = true;
        document.getElementById("T").disabled = true;
        
        var dbscanner = jDBSCAN().eps(20).minPts(10).distance('EUCLIDEAN').data(t_data);
        var point_assignment_result = dbscanner();

        var newData = data;
        newData.forEach(function(d,i){
             d.assignment = point_assignment_result[i]; 
        })


        var hashMap = {};
        newData.forEach(function(d){
            hashMap[d.assignment] = hashMap[d.assignment] ? hashMap[d.assignment] + 1 : 1;
        })

        var min = getMin(hashMap);
        var max = getMax(hashMap);

        Object.keys(hashMap).forEach(function (i){
            hashMap[i] = normalize(hashMap[i], max, min);
        });

        for(key in hashMap){
            newData.forEach(function(d){
                if(key == d.assignment){
                    d.assignment = hashMap[key];
                }
            })
        }

        awp = svg.selectAll("image")
            .data(data)
            .enter()
            .append("image")
            .attr("id", "awpDraw")
            .attr("x", function(d) { 
                if(d["wp"] == "AWP"){
                return x(d["att_pos_x"]); 
                }
            }) // x-axis coordinate of the center of the element.
            .attr("y", function (d) { 
                if(d["wp"] == "AWP"){
                    return y(d["att_pos_y"]); 
                    }
            }) // y-axis coordinate of the center of the element.
            .attr("width", function(d){
                if(d.assignment < 0.3){
                    return width = 75;
                }
                else if(d.assignment > 0.6 && d.assignment < 0.8){
                    return width = 50;
                }
                else{
                    return width = 25;
                }
            })
            .attr("height", function(d){
                if(d.assignment < 0.3){
                    return height = 75;
                }
                else if(d.assignment > 0.5 && d.assignment < 0.8){
                    return height = 50;
                }
                else{
                    return height = 25;
                }
            })
            .attr("xlink:href", "/assets/weapon/awp_icon.png");
    }
}

function map(data, map, mapData){
    //Current CSGO map
    var currentMap = map;
    var width = parseFloat(d3.select("#map_image").style("width"));  //svg width
    var height = parseFloat(d3.select("#map_image").style("height"));  //svg height
    var newData = convertCoordinates(data, currentMap, mapData, width, height);

    svg = d3.select("#map_image").append("svg")
            .attr("class", "w3-animate-opacity")
            .attr("id", "map")
            .attr("width",  width)
            .attr("height", height);
    
    var img = svg.append("image")
            .attr("xlink:href", "/assets/maps/"+currentMap+".png")
            .attr("width", width)
            .attr("height", height);

    document.getElementById("show_damage").onclick = function(){
        document.getElementById("CT").removeAttribute("disabled");
        document.getElementById("T").removeAttribute("disabled");
        document.getElementById("dbscan").removeAttribute("disabled");
        document.getElementById("awp_camp").removeAttribute("disabled");

        drawPoints(newData, width, height);
    }
}