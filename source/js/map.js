function convert2Coordinates(data){
    //Function to convert coordinates in order to plot points/heatmap
}



function map(data, map){
    //Current CSGO map
    var currentMap = map;
    
    var div = "#map_image";
    var width = d3.select("div").style("width"); //svg width
    var height = d3.select("div").style("height"); //svg height

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