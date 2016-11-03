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
class TextCell {
    text: string;
    constructor(text: string) {
        this.text = text;
    }
}

function repeat(string: string, times: number) {
    var result = "";
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}

class StretchCell {
    inner: any;
    height: number;
    width: number;
    constructor(inner: any, height: number, width: number) {
        this.inner = inner;
        this.height = height;
        this.width = width;
    }
    minWidth() {
        return Math.max(this.width, this.inner.minWidth());
    }
    minHeight() {
        return Math.max(this.height, this.inner.minHeight());
    }
    draw() {
        return this.inner.draw(this.width, this.height);
    }
}


var sc = new StretchCell(new TextCell("abc"), 1, 2);

console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]


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