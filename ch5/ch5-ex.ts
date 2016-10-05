//PROBLEM 1 //////////////////////////////////////////////////////////////////////////////

function flattenArray(inputArr: any[]): any[] {
    return inputArr.reduce((prev, curr) => prev.concat(curr));
};

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]

//PROBLEM 2 /////////////////////////////////////////////////////////////////////////////

import {ANCESTRY_FILE} from './ancestry';
let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array: any): number {
  function plus(a: number, b: number) { return a + b; }
  return array.reduce(plus) / array.length;
}

// builds up a new object byName that associates names with people.
let byName = {};
ancestry.forEach((person:any) => {
  byName[person.name] = person;
});

/*
1. filters byName object to remove entries where person.mother == null.
2. maps each entry in byName object to to subtract when the person was born from when their mother was born.
3. average() function is called on the newly mapped array to average all the numbers.
*/

function avgMotherChildAgeDiff(inputArr: number[]): number {
  return average(ancestry.filter((person: any) => { return byName[person.mother] !== null })
                         .map((person: any) => { return person.born - byName[person.mother].born })
  );
}

console.log(byName);
// → Object
console.log(avgMotherChildAgeDiff(ancestry));
// → 31.2




//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////

//assigns century property to each person in the array of objects.
ancestry.forEach((person: any) => {
  person.century = Math.ceil(person.died / 100);
});

console.log(ancestry);
