/*
md['att_pos_x'] = (md['ResX']*(md['att_pos_x']-md['StartX']))/(md['EndX']-md['StartX'])
md['att_pos_y'] = (md['ResY']*(md['att_pos_y']-md['StartY']))/(md['EndY']-md['StartY'])
md['vic_pos_x'] = (md['ResX']*(md['vic_pos_x']-md['StartX']))/(md['EndX']-md['StartX'])
md['vic_pos_y'] = (md['ResY']*(md['vic_pos_y']-md['StartY']))/(md['EndY']-md['StartY'])
*/

function convertCoordinates(data, map, resX, resY){
    var newData = data;
    var i = 0;
    var mapData = d3.csv("/source/data/map_data.csv", function(m){
        if(map == "de_dust2"){ i = 0; }
        else if(map == "de_inferno") { i = 1; }
        else{ i = 2 }
        newData.forEach(function(d){
            if(m[i].map == d.map && m[i].map == map){
                d.att_pos_x = parseFloat(d.att_pos_x);
                d.att_pos_x = parseFloat(resX) * ((Number(d.att_pos_x) - Number(m[i].StartX))/(Number(m[i].EndX) - Number(m[i].StartX)));
                
                d.att_pos_y = parseFloat(d.att_pos_y);
                d.att_pos_x = parseFloat(resY) * ((Number(d.att_pos_y) - Number(m[i].StartY))/(Number(m[i].EndY) - Number(m[i].StartY)));

                d.vic_pos_x = parseFloat(d.vic_pos_x);
                d.vic_pos_x = parseFloat(resX) * ((Number(d.vic_pos_x) - Number(m[i].StartX))/(Number(m[i].EndX) - Number(m[i].StartX)));

                d.vic_pos_y = parseFloat(d.vic_pos_y);
                d.vic_pos_y = parseFloat(resY) * ((Number(d.vic_pos_y) - Number(m[i].StartY))/(Number(m[i].EndY) - Number(m[i].StartY)));
            }
        })
    });

    return newData
  }
  

function map(data, map){
    //Current CSGO map
    var currentMap = map;
    var div = "#map_image";
    var width = d3.select("div").style("width"); //svg width
    var height = d3.select("div").style("height"); //svg height

    var newData = convertCoordinates(data,map,width,height);
    
    svg = d3.select("div").append("svg")
            .attr("id", "canvas")
            .attr("width",  width)
            .attr("height", height);
    
    var img = svg.append("svg:image")
            .attr("xlink:href", "/assets/maps/"+currentMap+".png")
            .style("width", width)
            .style("height", height);

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