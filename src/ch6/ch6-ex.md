# Problem 1
## A Vector Type

Write a constructor ```Vector``` that represents a vector in two-dimensional space. It takes ```x``` and ```y``` parameters (numbers), which it should save to properties of the same name. 

Give the ```Vector``` prototype two methods, ```plus``` and ```minus```, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors' (the one in ```this``` and the parameter) ```x``` and ```y``` values.

Add a getter property ```length``` to the prototype that computes the length of the vector-that is, the distance of the point (```x```,```y```) from the origin (0,0).

```javascript
console.log(new Vector(1,2).plus(new Vector(2,3))); 
// → Vector{x: 3, y: 5}
console.log(new Vector(1,2).minus(new Vector(2,3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3,4).length);
// → 5
```

# Problem 2
## Another Cell

Implement a cell type names ```StretchCell(inner, width, height)``` that conforms to the [table cell interface](http://eloquentjavascript.net/06_object.html#table_interface) described earlier in the chapter. It should wrap another cell (like ```UnderlineCell``` does) and ensure that the resulting cell has at least the given ```width``` and ```height```, even if the innner cell would naturally be smaller.

```javascript
var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
```

# Problem 3
## Sequence Interface

Design an *interface* that abstracts iteration over a collection of values. An object that provides this interface represents a sequence, and the interface must somehow make it possible for code that uses such an object to iterate over the sequence, looking at the element values it is made up of and having some way to find out when the end of the sequence is reached.

When you have specified your interface, try to write a function ```logFive``` that takes a sequence object and calls ```console.log``` on its first five elements-or fewer, if the sequence has fewer than five elements.

Then implement an object type ```ArraySeq``` that wraps an array and allows iteration over the array using the interface you designed. Implement another object type ```RangeSeq``` that iterates over a range of integers (taking ```from``` and ```to``` arguments to its constructor) instead.

```javascript
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
```