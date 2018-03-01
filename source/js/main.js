/************************
 * Function Definitions *
 * **********************
 * function resetButtonAttributes(): Reset button attributes.
 * function draw_de_dust2(mapD): Draw de_dust2.
 * function draw_de_inferno(mapD): Draw de_inferno.
 * function draw_de_train(mapD): Draw de_train.
 * function draw(): Draw function. Main.
 */

queue()
.defer(d3.csv, 'source/data/map_data.csv')
.await(draw);

var map_chart;
var map_image;
var currentMap;

function resetButtonAttributes(){
  document.getElementById("reset").disabled = true;
  document.getElementById("CT").removeAttribute("disabled");
  document.getElementById("T").removeAttribute("disabled");
  document.getElementById("awp_camp").removeAttribute("disabled");
  document.getElementById("dbscan").removeAttribute("disabled");
  document.getElementById("wins").removeAttribute("disabled");
  document.getElementById("bomb").removeAttribute("disabled");
}

function draw_de_dust2(mapD){
    resetButtonAttributes();
    var placeholderText = document.getElementById("placeholder");
    if(placeholderText != null){
      placeholderText.remove();
    }
    
    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);

    if(document.getElementById("map") != null){
      document.getElementById("map").remove(); //Reset canvas when changing map.
    }

    d3.csv("./source/data/mm_master_de_dust2.csv", function(d){
      map_image = new map(d, currentMap, mapD[0]);
    })

    d3.json("./source/data/de_dust2.json", function(data) {
      map_chart = new chart(data);
    });
}

function draw_de_inferno(mapD){
    resetButtonAttributes();

    var placeholderText = document.getElementById("placeholder");
    if(placeholderText != null){
      placeholderText.remove();
    }

    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);

    if(document.getElementById("map") != null){
      document.getElementById("map").remove(); //Reset canvas when changing map.
    }    
    d3.csv("./source/data/mm_master_de_inferno.csv", function(d){
      map_image = new map(d, currentMap, mapD[1]);
    })

    d3.json("./source/data/de_inferno.json", function(data) {
      map_chart = new chart(data);
    });
}

function draw_de_train(mapD){
    resetButtonAttributes();

    var placeholderText = document.getElementById("placeholder");
    if(placeholderText != null){
      placeholderText.remove();
    }

    e = event || window.event;
    btn = e.target || e.srcElement;
    currentMap = String(btn.id);

    if(document.getElementById("map") != null){
      document.getElementById("map").remove(); //Reset canvas when changing map.
    }

    d3.csv("./source/data/mm_master_de_train.csv", function(d){
      map_image = new map(d, currentMap, mapD[2]);
    })

    d3.json("./source/data/de_train.json", function(data) {
      map_chart = new chart(data);
    });
}



function draw(error, mapD){  
  if (error) throw error;
  document.getElementById("de_dust2").onclick = function(event){ //If de_dust2 map is selected.
    draw_de_dust2(mapD);
  }

  document.getElementById("de_inferno").onclick = function(event){ //If de_inferno map is selected.
    draw_de_inferno(mapD)
  }

  document.getElementById("de_train").onclick = function(event){ //If de_train is selected
    draw_de_train(mapD);
  } 
}