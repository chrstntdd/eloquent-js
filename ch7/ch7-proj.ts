import {Vector} from '../ch6/ch6-ex';

const directions = {
    'n':  new Vector( 0, 1),
    'ne': new Vector( 1,-1),
    'e':  new Vector( 1, 0),
    'se': new Vector( 0,-1),
    's':  new Vector( 0, 1),
    'sw': new Vector(-1, 1),
    'w':  new Vector(-1, 0),
    'nw': new Vector(-1,-1)
};

const plan = ["############################",
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

function randomElement(array){
    return array[Math.floor(Math.random() * array.length)];
}

class Grid{
    space: any;
    width: number;
    height: number
    constructor(width, height){
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
    }
    isInside(vector){
        return vector.x >= 0 && vector.x < this.width &&
               vector.y >= 0 && vector.y < this.height;
    }
    get(vector){
        return this.space[vector.x + this.width * vector.y];
    }
    set(vector, value){
        this.space[vector.x + this.width * vector.y] = value;
    }
}

//var grid = new Grid(5,5);
//console.log(grid.get(new Vector(1,1)));
// → undefined
//grid.set(new Vector(1, 1), "X");
//console.log(grid.get(new Vector(1, 1)));
// → X

function elementFromChar(legend, ch){
    if (ch == ' '){
        return null;
    }
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function charFromElement(element){
    if (element == null){
        return ' ';
    } else {
        return element.originChar;
    }
}

function Wall(){};

class BouncingCritter{
    direction;
    constructor(direction){
        this.direction = randomElement(directionNames);
    }
    act(view){
        if( view.look(this.direction)!= ' '){
            this.direction = view.find(' ') || 's';
        }
        return {type: 'move', direction: this.direction};
    }
}

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
console.log(world.toString());