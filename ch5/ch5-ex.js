//PROBLEM 1 //////////////////////////////////////////////////////////////////////////////
function flattenArray(inputArr) {
    return inputArr.reduce(function (prev, curr) { return prev.concat(curr); });
}
;
console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]
