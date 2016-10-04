//PROBLEM 1 //////////////////////////////////////////////////////////////////////////////

function flattenArray(inputArr: any[]): any[] {
    return inputArr.reduce((prev, curr) => prev.concat(curr));
};

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]

//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////

import {ANCESTRY_FILE} from './ancestry';
let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array: number[]): number {
  function plus(a: number, b: number) { return a + b; }
  return array.reduce(plus) / array.length;
}

let byName = {};
ancestry.forEach(function(person:any) {
  byName[person.name] = person;
});


function motherChildAgeDifference(input: any[]){

}



// → 31.2
