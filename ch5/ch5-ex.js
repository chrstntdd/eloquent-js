//PROBLEM 1 //////////////////////////////////////////////////////////////////////////////
"use strict";
function flattenArray(inputArr) {
    return inputArr.reduce(function (prev, curr) { return prev.concat(curr); });
}
;
console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]
//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////
var ancestry_1 = require('./ancestry');
var ancestry = JSON.parse(ancestry_1.ANCESTRY_FILE);
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}
var byName = {};
ancestry.forEach(function (person) {
    byName[person.name] = person;
});
function motherChildAgeDifference(input) {
}
// → 31.2
