//PROBLEM 1 /////////////////////////////////////////////////////////////////////////////
function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function (alt) {
    return new Vector(this.x + alt.x, this.y + alt.y);
};
Vector.prototype.minus = function (alt) {
    return new Vector(this.x - alt.x, this.y - alt.y);
};
Object.defineProperty(Vector.prototype, 'length', {
    get: function () { return Math.sqrt((this.x * this.x) + (this.y * this.y)); }
});
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////
/*
var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]

//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////

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
