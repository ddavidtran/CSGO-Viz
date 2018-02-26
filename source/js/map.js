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

    var circles = svg.selectAll(".circle")
        .data(data)
        .enter().append("circle")
        .attr("id", "circles")
        .attr("r",3) //Radius of the dot.
        .attr("cx", function(d,j) { return x(d["vic_pos_x"]); }) // x-axis coordinate of the center of the element.
        .attr("cy", function (d,j) { return y(d["vic_pos_y"]); }) // y-axis coordinate of the center of the element.
        .style('fill', "red")
        .style("stroke-width", 1)
        .style("stroke", "black");


    //DBScan. Density-based spatial clustering of applications with noise.
    document.getElementById("dbscan").onclick = function(){
        var dbscanner = jDBSCAN().eps(22).minPts(110).distance('EUCLIDEAN').data(t_data);
        var point_assignment_result = dbscanner();

        var hashMap = {};
        point_assignment_result.forEach(function(d){
            hashMap[d] = hashMap[d] ? hashMap[d] + 1 : 1; //Check if cluster exists in hashMap.
        })

        var arr = Object.values(hashMap);
        var min = Math.min(...arr);
        var max = Math.max(...arr);

        //console.log(point_assignment_result);
        if(document.getElementById("circles") != null){
            d3.selectAll("circle")
                .style('fill', function(d,j){
                        var normValue = Math.floor(normalize(hashMap[point_assignment_result[j]], max, min));
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

    document.getElementById("q1").onclick = function(){
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

    document.getElementById("q2").onclick = function(){
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
}

function map(data, map, mapData){
    //Current CSGO map
    var currentMap = map;
    var div = "#map_image";
    var width = parseFloat(d3.select("div").style("width"));  //svg width
    var height = parseFloat(d3.select("div").style("height"));  //svg height
    var newData = convertCoordinates(data, currentMap, mapData, width, height);

    svg = d3.select("div").append("svg")
            .attr("class", "w3-animate-opacity")
            .attr("id", "canvas")
            .attr("width",  width)
            .attr("height", height);
    
    var img = svg.append("image")
            .attr("xlink:href", "/assets/maps/"+currentMap+".png")
            .attr("width", width)
            .attr("height", height);
    console.log(data);

    document.getElementById("show_damage").onclick = function(){
        drawPoints(newData, width, height);
    }
}