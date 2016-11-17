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

const plan: string[] = ['############################',
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
    };
    get(vector: any){
        return this.space[vector.x + this.width * vector.y];
    };
    set(vector: any, value: any){
        this.space[vector.x + this.width * vector.y] = value;
    };
    forEach(f: any, context: any) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let value = this.space[x + y * this.width];
                if (value != null)
                    f.call(context, value, new Vector(x, y));
            }
        }
    };
}

function elementFromChar(legend: any, ch: string){
    if (ch == ' ') return null;
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function charFromElement(element: any){
    if (element == null) return ' ';
    else return element.originChar;
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
        });
    };
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
    protected letAct(critter: any, vector: any){
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
            if (this.grid.isInside(dest)) return dest;
        }
    };
}

class View {
    world:  any;
    vector: any;
    constructor(world: any, vector: any){
        this.world  = world;
        this.vector = vector;
    }
    look(dir: string){
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
          else 
            return '#';
    };
    findAll(ch: string){
        let found: string[] = [];
        for (var dir in directions)
            if (this.look(dir) == ch)
                found.push(dir);
        return found;
    };
    find(ch: string){
        var found = this.findAll(ch);
        if (found.length == 0) return null;
        return randomElement(found);
    };
}

function dirPlus(dir: string, n: number){
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

class WallFlower{
    dir: string;
    constructor(dir: string){
        this.dir = 's';
    };

    act(view: any){
        let start = this.dir;
        if(view.look(dirPlus(this.dir, -3)) != ' ')
            start = this.dir = dirPlus(this.dir, -2);
        while (view.look(this.dir) != ' '){
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start) break;
        }
        return {type: 'move', direction: this.dir};
    };
}

class LifelikeWorld extends World{
    map: any;
    legend: any;
    constructor(map: any, legend: any){
        super(map,legend);
        World.call(this,map,legend);
        Object.create(World);
    }
    letAct(critter: any, vector: any){
        let action = critter.act(new View(this, vector));
        let handled = action && 
                      action.type in actionTypes &&
                      actionTypes[action.type].call(this,critter,vector,action);

        if (!handled){
            critter.energy -= 0.2;
            if(critter.energy <= 0) 
                this.grid.set(vector,null);
        }
    };
}

let actionTypes = Object.create(null);

actionTypes.grow = function(critter: any){
    critter.energy += 0.5;
    return true;
};

actionTypes.move = function(critter: any, vector: any, action: any){
    let dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
        return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function(critter: any, vector: any, action: any){
    let dest = this.checkDestination(action, vector);
    let atDest = dest != null && this.grid.get(dest);
    if(!atDest || atDest.energy == null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

actionTypes.reproduce = function(critter: any, vector: any, action: any){
    let baby = elementFromChar(this.legend, critter.originChar);
    let dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};

class Plant {
    energy: number;
    constructor(energy: number) {
        this.energy = 3 + Math.random() * 4;
    }
    act(view: any) {
        if (this.energy > 15) {
            var space = view.find(' ');
            if (space)
                return { type: 'reproduce', direction: space };
        }
        if (this.energy < 20)
            return { type: 'grow',direction: undefined };
    };
}

class PlantEater{
    energy: number; 
    constructor(energy: number){
        this.energy = 20;
    }
    act(view: any){
        let space = view.find(' ');
        if (this.energy > 60 && space){
            return { type: 'reproduce', direction: space };
        }
        let plant = view.find('*');
        if(plant) {
            return { type: 'eat', direction: plant }
        }
        if(space){
            return { type: 'move',direction: space }
        }
    };
}

var valley = new LifelikeWorld(
  ['############################',
   '#####                 ######',
   '##   ***                **##',
   '#   *##**         **  O  *##',
   '#    ***     O    ##**    *#',
   '#       O         ##***    #',
   '#                 ##**     #',
   '#   O       #*             #',
   '#*          #**       O    #',
   '#***        ##**    O    **#',
   '##****     ###***       *###',
   '############################'],
  {'#': Wall,
   'O': PlantEater,
   '*': Plant}
);
animateWorld(valley);

//var world = new World(plan, {"#": Wall,
//                             "o": BouncingCritter});
//animateWorld(world);