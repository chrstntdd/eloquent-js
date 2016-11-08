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
    "##         #  ~#    ##     #",
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
    Grid.prototype.forEach = function (f, context) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var value = this.space[x + y * this.width];
                if (value != null) {
                    f.call(context, value, new ch6_ex_1.Vector(x, y));
                }
            }
        }
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
var World = (function () {
    function World(map, legend) {
        var grid = new Grid(map[0].length, map.length);
        this.grid = grid;
        this.legend = legend;
        this.map = map.forEach(function (line, y) {
            for (var x = 0; x < line.length; x++)
                grid.set(new ch6_ex_1.Vector(x, y), elementFromChar(legend, line[x]));
        });
    }
    ;
    World.prototype.toString = function () {
        var output = '';
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var element = this.grid.get(new ch6_ex_1.Vector(x, y));
                output += charFromElement(element);
            }
            output += '\n';
        }
        return output;
    };
    ;
    World.prototype.turn = function () {
        var acted = [];
        this.grid.forEach(function (critter, vector) {
            if (critter.act && acted.indexOf(critter) == -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        }, this);
    };
    ;
    World.prototype.letAct = function (critter, vector) {
        var action = critter.act(new View(this, vector));
        if (action && action.type == 'move') {
            var dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    };
    ;
    World.prototype.checkDestination = function (action, vector) {
        if (directions.hasOwnProperty(action.direction)) {
            var dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest)) {
                return dest;
            }
        }
    };
    ;
    return World;
}());
var View = (function () {
    function View(world, vector) {
        this.world = world;
        this.vector = vector;
    }
    View.prototype.look = function (dir) {
        var target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target)) {
            return charFromElement(this.world.grid.get(target));
        }
        else {
            return '#';
        }
    };
    ;
    View.prototype.findAll = function (ch) {
        var found = [];
        for (var dir in directions) {
            if (this.look(dir) == ch) {
                found.push(dir);
            }
            return found;
        }
    };
    ;
    View.prototype.find = function (ch) {
        var found = this.findAll(ch);
        if (found.length == 0) {
            return null;
        }
        return randomElement(found);
    };
    ;
    return View;
}());
function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}
var WallFlower = (function () {
    function WallFlower(dir) {
        this.dir = 's';
    }
    ;
    WallFlower.prototype.act = function (view) {
        var start = this.dir;
        if (view.look(dirPlus(this.dir, -3)) != ' ') {
            start = this.dir = dirPlus(this.dir, -2);
        }
        while (view.look(this.dir) != ' ') {
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start) {
                break;
            }
        }
        return { type: 'move', direction: this.dir };
    };
    ;
    return WallFlower;
}());
//initalize world.
var world = new World(plan, { '#': Wall,
    'o': BouncingCritter,
    '~': WallFlower });
for (var i = 0; i < 10; i++) {
    world.turn();
    console.log(world.toString());
}
