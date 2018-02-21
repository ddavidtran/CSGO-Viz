queue()
.defer(d3.csv,'source/data/mm_grenades.csv')
.await(draw);

var dataMining;
var map_chart;
var map_image;

function draw(error, data){
  if (error) throw error;
  dataMining = new dataMining(data);
  map_image = new map(data);
  map_chart = new chart();
}