import {elementFromChar, charFromElement, randomElement, Grid} from './direction'
import {Vector} from '../../ch6/ch6-ex';
import {actionTypes} from './actiontypes'

export class World{
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

class View {
    world:  any;
    vector: any;
    constructor(world: any, vector: any){
        this.world  = world;
        this.vector = vector;
    }
    look(dir: string): string{
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
          else 
            return '#';
    };
    findAll(ch: string): string[]{
        let found: string[] = [];
        for (var dir in directions)
            if (this.look(dir) == ch)
                found.push(dir);
        return found;
    };
    find(ch: string): string{
        var found = this.findAll(ch);
        if (found.length == 0) return null;
        return randomElement(found);
    };
}