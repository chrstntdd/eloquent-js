//PROBLEM 1 /////////////////////////////////////////////////////////////////////////////
class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    plus(alt: any) {
        return new Vector(this.x + alt.x, this.y + alt.y);
    }
    minus(alt: any) {
        return new Vector(this.x - alt.x, this.y - alt.y);
    }
    get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}

//console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
//console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
//console.log(new Vector(3, 4).length);
// → 5

//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////

//from textbook
function repeat(string: string, times: number): string {
    var result = '';
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}

class TextCell {
    text: any;
    constructor(text: any) {
        this.text = text.split('');
    }
    minWidth(): number {
        return this.text.reduce((width: number, line: any) => Math.max(width, line.length), 0);
    }
    minHeight(): number {
        return this.text.length;
    }
    draw(width: number, height: number) : any[]{
        var result: any[] = [];
        for (var i = 0; i < height; i++) {
            var line = this.text[i] || '';
            result.push(line + repeat(' ', width - line.length));
        }
        return result;
    }
}

class StretchCell extends TextCell {
    width:  number;
    height: number;
    constructor(text: any, width: number, height: number) {
        super(text);
        this.width  = width;
        this.height = height;
    }

    minWidth(): number {
        return super.minWidth();
    }
    minHeight(): number {
        return super.minHeight();
    }
    draw(width: number, height: number): any[] {
        return super.draw(width, height);
    }
}


var sc = new StretchCell(new TextCell('abc'), 1, 2);

console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ['abc', '   ']


//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////
/*
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
*/