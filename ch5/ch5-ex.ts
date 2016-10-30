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

let byName: any = {};
ancestry.forEach((person:any) => {
  byName[person.name] = person;
});

//filter function is called for each person to test if each person has a mother.
let hasKnownMother = (person: any) => person.mother in byName; 

function getMotherChildAgeDiff (person:any): number {
  return person.born - byName[person.mother].born
}

console.log(average(ancestry.filter(hasKnownMother).map(getMotherChildAgeDiff)));
// → 31.2




//PROBLEM 3 /////////////////////////////////////////////////////////////////////////////

//assigns century property to each person in the array of objects.
ancestry.forEach((person: any) => {
  person.century = Math.ceil(person.died / 100);
});

let data: any = {
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  21: []
};

//pushes person's age to array in data object
ancestry.forEach((person: any) => {
    for (let i: number = 16; i <= 21; i++){
        if (person.century === i) {
            data[i].push(person.died - person.born)
        }
    }
});

//TODO: call average function on each property's array of ages.

console.log(ancestry);
// → Array[39] with added century property.
console.log(data);
// → data object with ages pushed to the arrys within each property.
