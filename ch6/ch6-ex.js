var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//PROBLEM 1 /////////////////////////////////////////////////////////////////////////////
var Vector = (function () {
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
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
//console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
//console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
//console.log(new Vector(3, 4).length);
// → 5
//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////
//from textbook.
function repeat(string, times) {
    var result = '';
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}
//inferred from textbook.
//minWidth and minHeight methods have been altered from original code.
var TextCell = (function () {
    function TextCell(text) {
        this.text = text.split('');
    }
    TextCell.prototype.minWidth = function () {
        return this.text.length;
    };
    TextCell.prototype.minHeight = function () {
        return 1;
    };
    TextCell.prototype.draw = function (width, height) {
        var result = [];
        for (var i = 0; i < height; i++) {
            var line = this.text[i] || '';
            result.push(line + repeat(' ', width - line.length));
        }
        return result;
    };
    return TextCell;
}());
var StretchCell = (function (_super) {
    __extends(StretchCell, _super);
    function StretchCell(text, width, height) {
        _super.call(this, text);
        this.width = width;
        this.height = height;
    }
    StretchCell.prototype.minWidth = function () {
        return Math.max(this.width, _super.prototype.minWidth.call(this));
    };
    StretchCell.prototype.minHeight = function () {
        return Math.max(this.height, _super.prototype.minHeight.call(this));
    };
    StretchCell.prototype.draw = function (width, height) {
        return _super.prototype.draw.call(this, this.width, this.height);
    };
    return StretchCell;
}(TextCell));
var sc = new StretchCell('abc', 1, 2);
//console.log(sc.minWidth());
// → 3
//console.log(sc.minHeight());
// → 2
//console.log(sc.draw(3, 2));
// draw method inherited from text. Output doesn't pass test. ¯\_(ツ)_/¯ 
// → ['abc', '   ']
//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////
function logFive(seq) {
    for (var i = 0; i < 5; i++) {
        if (!seq.next()) {
            break;
        }
        console.log(seq.current());
    }
}
var ArraySeq = (function () {
    function ArraySeq(array) {
        this.pos = 1;
        this.array = array;
    }
    ArraySeq.prototype.next = function () {
        if (this.pos >= this.array.length - 1) {
            return false;
        }
        this.pos++;
        return true;
    };
    ArraySeq.prototype.current = function () {
        return this.array[this.pos];
    };
    return ArraySeq;
}());
var RangeSeq = (function () {
    function RangeSeq(start, end) {
        this.pos = start - 1;
        this.end = end;
    }
    RangeSeq.prototype.next = function () {
        if (this.pos >= this.end) {
            return false;
        }
        this.pos++;
        return true;
    };
    RangeSeq.prototype.current = function () {
        return this.pos;
    };
    return RangeSeq;
}());
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
