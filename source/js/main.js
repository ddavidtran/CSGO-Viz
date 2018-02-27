queue()
.defer(d3.csv, 'source/data/map_data.csv')
.await(draw);

var dataMining;
var map_chart;
var map_image;
var currentMap;

function draw(error, mapD){
  if (error) throw error;
  document.getElementById("de_dust2").onclick = function(event){ //If de_dust2 map is selected.
  
  var headers = document.getElementsByTagName("h2");
  if(headers != null){
    //document.getElementsByTagName("p")[0].remove();
    for (var i = 0, l = headers.length; i < l; i++) {
      headers[i].remove()
    }
  }
      
    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }
    d3.csv("source/data/mm_master_de_dust2.csv", function(d){
      map_image = new map(d, currentMap, mapD[0]);
      //dataMining = new dataMining(d, currentMap, mapD[0]);
    })
  }

  document.getElementById("de_inferno").onclick = function(event){ //If de_inferno map is selected.

    var headers = document.getElementsByTagName("h2");
    if(headers != null){
      //document.getElementsByTagName("p")[0].remove()
      for (var i = 0, l = headers.length; i < l; i++) {
        headers[i].remove()
      }
    }

    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }    
    d3.csv("source/data/mm_master_de_inferno.csv", function(d){
      map_image = new map(d, currentMap, mapD[1]);
      //dataMining = new dataMining(d, currentMap, mapD[1]);
    })
  }

  document.getElementById("de_train").onclick = function(event){ //If de_train is selected

  var headers = document.getElementsByTagName("h2");
  if(headers != null){
    //document.getElementsByTagName("p")[0].remove()
    for (var i = 0, l = headers.length; i < l; i++) {
      headers[i].remove()
    }
  }
    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }

    d3.csv("source/data/mm_master_de_train.csv", function(d){
      map_image = new map(d, currentMap, mapD[2]);
      //dataMining = new dataMining(d, currentMap, mapD[2]);
    })
  }

   //map_chart = new chart();
}