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
    var x = d3.scale.linear().range([0, width]).domain([0,width]);
    var y = d3.scale.linear().range([height, 0]).domain([0,height]);

    var circles = svg.selectAll(".circle")
        .data(data)
        .enter().append("circle")
        .attr("r",3) //Radius of the dot.
        .attr("cx", function(d) { return x(d["vic_pos_x"]); }) // x-axis coordinate of the center of the element.
        .attr("cy", function (d) { return y(d["vic_pos_y"]); }) // y-axis coordinate of the center of the element.
        .style("fill", "red")
        .style("stroke-width", 1)
        .style("stroke", "black");
}

function map(data, map, mapData){
    //Current CSGO map
    var currentMap = map;
    var div = "#map_image";
    var width = parseFloat(d3.select("div").style("width"));  //svg width
    var height = parseFloat(d3.select("div").style("height"));  //svg height
    var newData = convertCoordinates(data, currentMap, mapData, width, height);

    svg = d3.select("div").append("svg")
            .attr("id", "canvas")
            .attr("width",  width)
            .attr("height", height);
    
    var img = svg.append("image")
            .attr("xlink:href", "/assets/maps/"+currentMap+".png")
            .attr("width", width)
            .attr("height", height);

    drawPoints(newData, width, height);
      
    function redraw(){
        // Extract the width and height that was computed by CSS.
        var width = d3.select("div").style("width"); //svg width
        var height = d3.select("div").style("height"); //svg height

        // Use the extracted size to set the size of an SVG element.
        svg
            .attr("width", width)
            .attr("height", height);
        
        img 
            .style("width", width)
            .style("height", height);
    }

    // Draw for the first time to initialize.
    redraw();

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", redraw);

}