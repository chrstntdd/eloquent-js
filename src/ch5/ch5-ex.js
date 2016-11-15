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
//filter function is called for each person to test if each person has a mother.
var hasKnownMother = function (person) { return person.mother in byName; };
function getMotherChildAgeDiff(person) {
    return person.born - byName[person.mother].born;
}
console.log(average(ancestry.filter(hasKnownMother).map(getMotherChildAgeDiff)));
// → 31.2
//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////
//assigns century key to each person in the array of objects with value.
ancestry.forEach(function (person) {
    person.century = Math.ceil(person.died / 100);
});
var data = {
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: []
};
//pushes person's age to array in data object
ancestry.forEach(function (person) {
    for (var i = 16; i <= 21; i++) {
        if (person.century === i) {
            data[i].push(person.died - person.born);
        }
    }
});
console.log(data);
// → data object with ages pushed to the arrys within each property.
//Applies average method on each century value.
//ANSWER
for (var century in data) {
    console.log(century + ": " + average(data[century]).toFixed(1));
}
//PROBLEM 4 /////////////////////////////////////////////////////////////////////////////
function every(input, test) {
    for (var i = 0; i < input.length; i++) {
        if (!test(input[i])) {
            return false;
        }
    }
    return true;
}
function some(input, test) {
    for (var j = 0; j < input.length; j++) {
        if (test(input[j])) {
            return true;
        }
    }
    return false;
}
console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
