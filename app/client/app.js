var cellNum = 1;
var cell = {};
var diamonds = {};
global.startApp = function(container) {
  console.log("Here is the container:", container);
  $(document).ready(function() {
    generateRandom();
    initGame();
    
    $("#restart").on("click", function() {
        generateRandom();
        initGame();
    });
  });
}

function generateRandom(){
  while (Object.keys(diamonds).length < 8) {
    var randomnumber = Math.floor(Math.random() * 64) + 1
    diamonds[randomnumber] = randomnumber;
  }
}

function initGame() {
  var table = document.createElement("table");
  table.id = "board";
  table.className = "table-bordered";
  for (var i = 1; i <= 8; i++) {
      var tr = document.createElement('tr');
      for (var j = 1; j <= 8; j++) {
          var td = document.createElement('td');
          cell[cellNum] = {
              x: i,
              y: j
          };
          td.className = "cell unknown";
          td.id = cellNum;
          cellNum++;
          tr.appendChild(td);
      }
      table.appendChild(tr);
  }
  document.getElementById("gameboard").innerHTML = "";
  document.getElementById("gameboard").appendChild(table);
  $(".cell").on("click", clickHandler);
}

function clickHandler(e) {
  if (!e.target.classList.contains('disabled')) {
    if (Object.keys(diamonds).length) {
      if (diamonds[e.target.id]) {
          $('.arrow').removeClass('arrow');
          e.target.className = "cell diamond disabled";
          delete diamonds[e.target.id];
          if (Object.keys(diamonds).length == 0) {
              $('#winner').modal('show');
              $('#winScore').empty().text($('.unknown').length);
          }
      } else {
          var rotate = hint(e.target.id);
          $('.arrow').removeClass('arrow');
          e.target.className = "cell arrow disabled";
          e.target.style["transform"] = "rotate(" + rotate + "deg)";
        
      }
    }
  }
    
}

function minDistance(clicked_id) {
  var distanceMap = {};
  Object.keys(diamonds).map((id) => {
      distanceMap[id] = Math.abs(cell[clicked_id].x - cell[id].x) + Math.abs(cell[clicked_id].y - cell[id].y);
  });
  return Object.keys(distanceMap).sort(function(a, b) {
      return distanceMap[a] - distanceMap[b]
  })[0];
}

function hint(clicked_id) {
  var nearestDiamondId = minDistance(clicked_id);
  return (Math.atan2((cell[nearestDiamondId].x - cell[clicked_id].x), (cell[nearestDiamondId].y - cell[clicked_id].y))) * 180 / Math.PI;
}