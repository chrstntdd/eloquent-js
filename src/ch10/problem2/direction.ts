import {Vector} from '../../ch6/ch6-ex';

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

export let directionNames: string[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

export function randomElement(array: string[]){
    return array[Math.floor(Math.random() * array.length)];
}

export class Grid{
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
export function elementFromChar(legend: any, ch: string){
    if (ch == ' ') return null;
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}
export function charFromElement(element: any){
    if (element == null) return ' ';
    else return element.originChar;
}
export function dirPlus(dir: string, n: number){
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}