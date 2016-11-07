"use strict";
var ch6_ex_1 = require('../ch6/ch6-ex');
var directions = {
    'n': new ch6_ex_1.Vector(0, 1),
    'ne': new ch6_ex_1.Vector(1, -1),
    'e': new ch6_ex_1.Vector(1, 0),
    'se': new ch6_ex_1.Vector(0, -1),
    's': new ch6_ex_1.Vector(0, 1),
    'sw': new ch6_ex_1.Vector(-1, 1),
    'w': new ch6_ex_1.Vector(-1, 0),
    'nw': new ch6_ex_1.Vector(-1, -1)
};
var plan = ["############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"];
var directionNames = 'n ne e se s sw w nw'.split(' ');
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
var Grid = (function () {
    function Grid(width, height) {
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
    }
    Grid.prototype.isInside = function (vector) {
        return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
    };
    Grid.prototype.get = function (vector) {
        return this.space[vector.x + this.width * vector.y];
    };
    Grid.prototype.set = function (vector, value) {
        this.space[vector.x + this.width * vector.y] = value;
    };
    return Grid;
}());
//var grid = new Grid(5,5);
//console.log(grid.get(new Vector(1,1)));
// → undefined
//grid.set(new Vector(1, 1), "X");
//console.log(grid.get(new Vector(1, 1)));
// → X
function elementFromChar(legend, ch) {
    if (ch == ' ') {
        return null;
    }
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function charFromElement(element) {
    if (element == null) {
        return ' ';
    }
    else {
        return element.originChar;
    }
}
function Wall() { }
;
var BouncingCritter = (function () {
    function BouncingCritter(direction) {
        this.direction = randomElement(directionNames);
    }
    BouncingCritter.prototype.act = function (view) {
        if (view.look(this.direction) != ' ') {
            this.direction = view.find(' ') || 's';
        }
        return { type: 'move', direction: this.direction };
    };
    return BouncingCritter;
}());
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new ch6_ex_1.Vector(x, y), elementFromChar(legend, line[x]));
    });
}
World.prototype.toString = function () {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new ch6_ex_1.Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};
var world = new World(plan, { "#": Wall,
    "o": BouncingCritter });
console.log(world.toString());
