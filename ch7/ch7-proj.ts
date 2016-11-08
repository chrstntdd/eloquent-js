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

const plan: string[] = ["############################",
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

var directionNames: string[] = 'n ne e se s sw w nw'.split(' ');

function randomElement(array: string[]){
    return array[Math.floor(Math.random() * array.length)];
}

class Grid{
    space: any;
    width: number;
    height: number;
    constructor(width: number, height: number){
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
    }
    isInside(vector: any){
        return vector.x >= 0 && vector.x < this.width &&
               vector.y >= 0 && vector.y < this.height;
    }
    get(vector: any){
        return this.space[vector.x + this.width * vector.y];
    }
    set(vector: any, value: any){
        this.space[vector.x + this.width * vector.y] = value;
    }
    forEach(f: any, context: any) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let value = this.space[x + y * this.width];
                if (value != null) {
                    f.call(context, value, new Vector(x, y));
                }
            }
        }
    }
}

//var grid = new Grid(5,5);
//console.log(grid.get(new Vector(1,1)));
// → undefined
//grid.set(new Vector(1, 1), "X");
//console.log(grid.get(new Vector(1, 1)));
// → X

function elementFromChar(legend: any, ch: string){
    if (ch == ' '){
        return null;
    }
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function charFromElement(element: any){
    if (element == null){
        return ' ';
    } else {
        return element.originChar;
    }
}

function Wall(){};

class BouncingCritter{
    direction: string;
    constructor(direction: string){
        this.direction = randomElement(directionNames);
    }
    act(view: any){
        if( view.look(this.direction)!= ' '){
            this.direction = view.find(' ') || 's';
        }
        return {type: 'move', direction: this.direction};
    }
}

class World{
    grid:   any;
    legend: any;
    map:    any;
    constructor(map: string[], legend: any) {
        var grid       = new Grid(map[0].length, map.length);
        this.grid      = grid;
        this.legend    = legend;
        this.map       = map.forEach(function (line, y) {
            for (var x = 0; x < line.length; x++)
                grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
        })
    }
    toString(){
        let output = '';
        for(var y = 0; y < this.grid.height; y++){
            for (var x = 0; x < this.grid.width; x++){
                let element = this.grid.get(new Vector(x,y));
                output += charFromElement(element);
            }
            output+= '\n';
        }
        return output;
    };
    turn(){
        let acted: any[] = [];
        this.grid.forEach(function(critter: any, vector: any){
            if (critter.act && acted.indexOf(critter) == -1){
                acted.push(critter);
                this.letAct(critter, vector);
            }
        }, this);
    };
    private letAct(critter: any, vector: any){
        let action = critter.act(new View(this, vector));
        if (action && action.type == 'move'){
            let dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null){
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    };
    private checkDestination(action: any, vector: any){
        if (directions.hasOwnProperty(action.direction)){
            let dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest)){
                return dest;
            }
        }
    };
}

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});


class View {
    world:  any;
    vector: any;
    constructor(world: any, vector: any){
        this.world  = world;
        this.vector = vector;
    }
    look(dir: string){
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target)){
            return charFromElement(this.world.grid.get(target));
        } else {
            return '#';
        }
    }
    findAll(ch: string){
        let found: string[] = [];
        for (var dir in directions){
            if (this.look(dir) == ch){
                found.push(dir);
            }
            return found;
        }
    }
    find(ch: string){
        var found = this.findAll(ch);
        if (found.length == 0){
            return null;
        }
        return randomElement(found);
    }
}


for (var i = 0; i < 10; i++) {
  world.turn();
  console.log(world.toString());
}
