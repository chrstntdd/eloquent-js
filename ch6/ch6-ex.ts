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

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5

//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////

//from textbook.
function repeat(string: string, times: number): string {
    var result = '';
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}
//inferred from textbook.
//minWidth and minHeight methods have been altered from original code.
class TextCell {
    text: any;
    constructor(text: string) {
        this.text = text.split('');
    }
    minWidth(): number {
        return this.text.length;
    }
    minHeight(): number {
        return 1;
    }
    draw(width: number, height: number): any[] {
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
    constructor(text: string, width: number, height: number) {
        super(text);
        this.width = width;
        this.height = height;
    }

    minWidth(): number {
        return Math.max(this.width, super.minWidth());
    }
    minHeight(): number {
        return Math.max(this.height, super.minHeight());
    }
    draw(width: number, height: number): any[] {
        return super.draw(this.width, this.height);
    }
}


var sc = new StretchCell('abc', 1, 2);

console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// draw method inherited from text. Output doesn't pass test. ¯\_(ツ)_/¯ 
// → ['abc', '   ']


//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////

function logFive(seq: any) {
    for (var i = 0; i < 5; i++) {
        if (!seq.next()) {
            break
        }
        console.log(seq.current());
    }
}

class ArraySeq {
    pos:   number;
    array: number[];
    constructor(array: number[]) {
        this.pos   = -1;
        this.array = array;
    }
    next() {
        if (this.pos >= this.array.length - 1) {
            return false
        }
        this.pos++;
        return true;
    }
    current() {
        return this.array[this.pos];
    }
}

//using start and end instead of from and to arguments.
class RangeSeq {
    pos: number;
    end: number;
    constructor(start: number, end: number) {
        this.pos = start - 1;
        this.end = end;
    }
    next() {
        if (this.pos >= this.end) {
            return false;
        }
        this.pos++
        return true;
    }
    current() {
        return this.pos;
    }
}


logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
