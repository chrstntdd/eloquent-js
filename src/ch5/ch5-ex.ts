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

//assigns century key to each person in the array of objects with value.
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


console.log(data);
// → data object with ages pushed to the arrys within each property.

//Applies average method on each century value.
//ANSWER
for (let century in data) {
  console.log(century + ": " + average(data[century]).toFixed(1));
}

//PROBLEM 4 /////////////////////////////////////////////////////////////////////////////

function every(input: any[], test: any) {
  for (var i: number = 0; i < input.length; i++) {
    if (!test(input[i])){
      return false;
    }
  }
  return true;
}

function some(input: any[], test: any) {
  for (let j: number = 0; j < input.length; j++){
    if (test(input[j])){
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
