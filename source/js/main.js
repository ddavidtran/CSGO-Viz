queue()
.defer(d3.csv,'source/data/mm_grenades.csv')
.await(draw);

var dataMining;

function draw(error, data){
  if (error) throw error;
  dataMining = new dataMining(data);
}