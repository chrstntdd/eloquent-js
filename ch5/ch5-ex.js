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
// builds up a new object byName that associates names with people.
var byName = {};
ancestry.forEach(function (person) {
    byName[person.name] = person;
});
/*
1. filters byName object to remove entries where person.mother == null.
2. maps each entry in byName object to to subtract when the person was born from when their mother was born.
3. average() function is called on the newly mapped array to average all the numbers.
*/
function avgMotherChildAgeDiff(inputArr) {
    return average(ancestry.filter(function (person) { return byName[person.mother] !== null; })
        .map(function (person) { return person.born - byName[person.mother].born; }));
}
console.log(byName);
// → Object
console.log(avgMotherChildAgeDiff(ancestry));
// → 31.2
//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////
//assigns century property to each person in the array of objects.
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
//TODO: call average function on each property's array of ages.
console.log(ancestry);
// → Array[39] with added century property.
console.log(data);
// → data object with ages pushed to the arrys within each property.
