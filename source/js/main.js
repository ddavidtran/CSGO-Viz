queue()
.defer(d3.csv,'source/data/mm_master_de_dust2.csv')
.defer(d3.csv,'source/data/mm_master_de_inferno.csv')
.defer(d3.csv,'source/data/mm_master_de_train.csv')
.await(draw);

var dataMining;
var map_chart;
var map_image;
var currentMap;

function draw(error, data1, data2, data3){
  if (error) throw error;
  
  document.getElementById("de_dust2").onclick = function(){ //If de_dust2 map is selected.
    var e = window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }
    map_image = new map(data1, currentMap);
  }

  document.getElementById("de_inferno").onclick = function(){ //If de_nuke map is selected.
    var e = window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }
    map_image = new map(data2, currentMap);
  }

  document.getElementById("de_train").onclick = function(){ //If de_train is selected
    var e = window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);
    if(document.getElementById("canvas") != null){
      document.getElementById("canvas").remove(); //Reset canvas when changing map.
    }
    map_image = new map(data3, currentMap);
  }

  //dataMining = new dataMining(data);
  //map_chart = new chart();
}