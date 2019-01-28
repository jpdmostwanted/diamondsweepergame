/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var cellNum = 1;
var cell = {};
var diamonds = {};
global.startApp = function (container) {
  console.log("Here is the container:", container);
  $(document).ready(function () {
    generateRandom();
    initGame();

    $("#restart").on("click", function () {
      generateRandom();
      initGame();
    });
  });
};

function generateRandom() {
  while (Object.keys(diamonds).length < 8) {
    var randomnumber = Math.floor(Math.random() * 64) + 1;
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
  Object.keys(diamonds).map(function (id) {
    distanceMap[id] = Math.abs(cell[clicked_id].x - cell[id].x) + Math.abs(cell[clicked_id].y - cell[id].y);
  });
  return Object.keys(distanceMap).sort(function (a, b) {
    return distanceMap[a] - distanceMap[b];
  })[0];
}

function hint(clicked_id) {
  var nearestDiamondId = minDistance(clicked_id);
  return Math.atan2(cell[nearestDiamondId].x - cell[clicked_id].x, cell[nearestDiamondId].y - cell[clicked_id].y) * 180 / Math.PI;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);