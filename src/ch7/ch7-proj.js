"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var plan = ['############################',
    '#      #    #      o      ##',
    '#                          #',
    '#          #####           #',
    '##         #   #    ##     #',
    '###           ##     #     #',
    '#           ###      #     #',
    '#   ####                   #',
    '#   ##       o             #',
    '# o  #         o       ### #',
    '#    #                     #',
    '############################'];
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
    ;
    Grid.prototype.get = function (vector) {
        return this.space[vector.x + this.width * vector.y];
    };
    ;
    Grid.prototype.set = function (vector, value) {
        this.space[vector.x + this.width * vector.y] = value;
    };
    ;
    Grid.prototype.forEach = function (f, context) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var value = this.space[x + y * this.width];
                if (value != null)
                    f.call(context, value, new ch6_ex_1.Vector(x, y));
            }
        }
    };
    ;
    return Grid;
}());
function elementFromChar(legend, ch) {
    if (ch == ' ')
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function charFromElement(element) {
    if (element == null)
        return ' ';
    else
        return element.originChar;
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
            if (this.grid.isInside(dest))
                return dest;
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
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
        else
            return '#';
    };
    ;
    View.prototype.findAll = function (ch) {
        var found = [];
        for (var dir in directions)
            if (this.look(dir) == ch)
                found.push(dir);
        return found;
    };
    ;
    View.prototype.find = function (ch) {
        var found = this.findAll(ch);
        if (found.length == 0)
            return null;
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
        if (view.look(dirPlus(this.dir, -3)) != ' ')
            start = this.dir = dirPlus(this.dir, -2);
        while (view.look(this.dir) != ' ') {
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start)
                break;
        }
        return { type: 'move', direction: this.dir };
    };
    ;
    return WallFlower;
}());
var LifelikeWorld = (function (_super) {
    __extends(LifelikeWorld, _super);
    function LifelikeWorld(map, legend) {
        _super.call(this, map, legend);
        World.call(this, map, legend);
        Object.create(World);
    }
    LifelikeWorld.prototype.letAct = function (critter, vector) {
        var action = critter.act(new View(this, vector));
        var handled = action &&
            action.type in actionTypes &&
            actionTypes[action.type].call(this, critter, vector, action);
        if (!handled) {
            critter.energy -= 0.2;
            if (critter.energy <= 0)
                this.grid.set(vector, null);
        }
    };
    ;
    return LifelikeWorld;
}(World));
var actionTypes = Object.create(null);
actionTypes.grow = function (critter) {
    critter.energy += 0.5;
    return true;
};
actionTypes.move = function (critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
        return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};
actionTypes.eat = function (critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
actionTypes.reproduce = function (critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar);
    var dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};
var Plant = (function () {
    function Plant(energy) {
        this.energy = 3 + Math.random() * 4;
    }
    Plant.prototype.act = function (view) {
        if (this.energy > 15) {
            var space = view.find(' ');
            if (space)
                return { type: 'reproduce', direction: space };
        }
        if (this.energy < 20)
            return { type: 'grow', direction: undefined };
    };
    ;
    return Plant;
}());
var PlantEater = (function () {
    function PlantEater(energy) {
        this.energy = 20;
    }
    PlantEater.prototype.act = function (view) {
        var space = view.find(' ');
        if (this.energy > 60 && space) {
            return { type: 'reproduce', direction: space };
        }
        var plant = view.find('*');
        if (plant) {
            return { type: 'eat', direction: plant };
        }
        if (space) {
            return { type: 'move', direction: space };
        }
    };
    ;
    return PlantEater;
}());
// var valley = new LifelikeWorld(
//   ['############################',
//    '#####                 ######',
//    '##   ***                **##',
//    '#   *##**         **  O  *##',
//    '#    ***     O    ##**    *#',
//    '#       O         ##***    #',
//    '#                 ##**     #',
//    '#   O       #*             #',
//    '#*          #**       O    #',
//    '#***        ##**    O    **#',
//    '##****     ###***       *###',
//    '############################'],
//   {'#': Wall,
//    'O': PlantEater,
//    '*': Plant}
// );
// animateWorld(valley);
///////////////////////////////////////////////////////////////////////
//Problem 1
var SmartPlantEater = (function () {
    function SmartPlantEater(energy, dir) {
        this.energy = 20;
        this.dir = randomElement(directionNames);
    }
    SmartPlantEater.prototype.act = function (view) {
        var space = view.find(' ');
        var plants = view.findAll('*');
        if (this.energy > 95 && space)
            return { type: 'reproduce', direction: space };
        if (plants.length > 1)
            return { type: 'eat', direction: randomElement(plants) };
        if (view.look(this.dir) != ' ' && space)
            this.dir = space;
        return { type: 'move', direction: this.dir };
    };
    ;
    return SmartPlantEater;
}());
// animateWorld(new LifelikeWorld(
//   ['############################',
//    '#####                 ######',
//    '##   ***                **##',
//    '#   *##**         **  O  *##',
//    '#    ***     O    ##**    *#',
//    '#       O         ##***    #',
//    '#                 ##**     #',
//    '#   O       #*             #',
//    '#*          #**       O    #',
//    '#***        ##**    O    **#',
//    '##****     ###***       *###',
//    '############################'],
//   {'#': Wall,
//    'O': SmartPlantEater,
//    '*': Plant}
// ));
//PROBLEM 2
actionTypes.stay = function (critter, vector, action) {
    return false;
};
var Tiger = (function () {
    function Tiger(energy, dir, memory) {
        this.energy = 90;
        this.dir = randomElement(directionNames);
        this.memory = []; //holds count of number of prey around predator each turn.
    }
    Tiger.prototype.act = function (view) {
        var seenEachTurn = this.memory.reduce(function (a, b) { return a + b; }, 0) / this.memory.length;
        var prey = view.findAll('O');
        var space = view.find(' ');
        this.memory.push(prey.length);
        if (this.memory.length > 5)
            this.memory.shift();
        if (prey.length && seenEachTurn > 0.33)
            return { type: 'eat', direction: randomElement(prey) };
        if (seenEachTurn < 0.10)
            return { type: 'stay', direction: undefined };
        if (this.energy > 300 && space)
            return { type: 'reproduce', direction: space };
        if (view.look(this.dir) != ' ' && space)
            this.dir = space;
        return { type: 'move', direction: this.dir };
    };
    ;
    return Tiger;
}());
animateWorld(new LifelikeWorld(['####################################################',
    '#                 ####         ****              ###',
    '#   *  @  ##                 ########       OO    ##',
    '#   *    ##        O O                 ****       *#',
    '#       ##*                        ##########     *#',
    '#      ##***  *         ****                     **#',
    '#* **  #  *  ***      #########                  **#',
    '#* **  #      *               #   *              **#',
    '#     ##              #   O   #  ***          ######',
    '#*            @       #       #   *        O  #    #',
    '#*                    #  ######                 ** #',
    '###          ****          ***                  ** #',
    '#       O                        @         O       #',
    '#   *     ##  ##  ##  ##               ###      *  #',
    '#   **         #              *       #####  O     #',
    '##  **  O   O  #  #    ***  ***        ###      ** #',
    '###               #   *****                    ****#',
    '####################################################'], { '#': Wall,
    '@': Tiger,
    'O': SmartPlantEater,
    '*': Plant }));
