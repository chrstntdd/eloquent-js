import {randomElement, directionNames, dirPlus} from './direction'

export function Wall(){};

export class BouncingCritter{
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

export class WallFlower{
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

export class Plant {
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

export class PlantEater{
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

export class SmartPlantEater{
    energy: number;
    dir:    string;
    constructor(energy: number, dir: string){
        this.energy = 20;
        this.dir = randomElement(directionNames);
    }
    act(view: any){
        let space:  any      = view.find(' ');
        let plants: string[] = view.findAll('*');
        if (this.energy > 95 && space) 
            return { type: 'reproduce', direction: space};
        if (plants.length > 1) 
            return { type: 'eat', direction: randomElement(plants)};
        if (view.look(this.dir) != ' ' && space)
            this.dir = space;
            return { type: 'move', direction: this.dir};
    };
}

export class Tiger {
    energy: number;
    dir:    string;
    memory: any[];
    constructor(energy: number, dir: string, memory: any[]) {
        this.energy = 90;
        this.dir    = randomElement(directionNames);
        this.memory = []; //holds count of number of prey around predator each turn.
    }
    act(view: any) {
        let seenEachTurn: number   = this.memory.reduce((a, b) => a + b, 0) / this.memory.length;
        let prey:         string[] = view.findAll('O');
        let space:        any      = view.find(' ');
        this.memory.push(prey.length);
        if (this.memory.length > 5)
            this.memory.shift();
        if (prey.length && seenEachTurn > 0.33)
            return { type: 'eat', direction: randomElement(prey)};
        if (seenEachTurn < 0.10)
            return { type: 'stay', direction: undefined }
        if (this.energy > 300 && space)
            return { type: 'reproduce', direction: space };
        if (view.look(this.dir) != ' ' && space)
            this.dir = space;
            return { type: 'move', direction: this.dir };
    };
}