//PROBLEM 1 //////////////////////////////////////////////////////////////////////////////

function flattenArray(inputArr: any[]): any[] {
    return inputArr.reduce((prev, curr) => prev.concat(curr));
};

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]
