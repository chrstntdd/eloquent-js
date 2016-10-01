//PROBLEM 1///////////////////////////////////////////////////////////
    function range (start: number,end: number) {

        let returnArray: number[]= [];
        for (let i:number = start; i<end+1; i++){
            returnArray.push(i);
        }
        return returnArray;
    }


    console.log(range(1, 10)); //[1,2,3...8,9,10]

    function sumArr(inputArray: number[]) {
        let totalSum: number = 0;
        for (let i: number = 0; i < inputArray.length; i++){
            totalSum += inputArray[i];
        }
        return totalSum;
    }

    console.log(sumArr(range(1, 10))); //55


    function refinedRange(start: number, end: number, increment: number) {
        let returnArray: number[] = [];
        if(start > end && increment < 0){ //decrement
            for (let i:number = start; i > end -1 ; i += increment ){
                returnArray.push(i);
            }
        } else if(start < end && increment > 0){ //increment
            for (let i:number = start; i < end +1; i += increment){
                returnArray.push(i);
            }
        } else {
            throw Error; //improper use of function
        }
        return returnArray;
        }

    console.log(refinedRange(5, 2, -1)); //5,4,3,2

//PROBLEM 2///////////////////////////////////////////////////////////

  function reverseArray (arg: any[]) {
    let backwardsArray: any[] = [];
    for (let i: number = arg.length; i > 0; i--) {
      backwardsArray.push(arg[i-1]);
    }
    return backwardsArray;
  }
  console.log(reverseArray(["A", "B", "C"]));
  // → ["C", "B", "A"];


  function reverseArrayInPlace(arg: any[]) {
    let inputArrLength: number = arg.length;
    for (let i: number = inputArrLength; i > 0; i--) {
      arg.push(arg[i - 1]);
    }
    arg.splice(0, inputArrLength);
  }

  let arrayValue = [1,2,3,4,5];
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
  // → [5, 4, 3, 2, 1]


//PROBLEM 3///////////////////////////////////////////////////////////
function arrayToList(inputArr: number[]) {

  let list:any = null;

  for (let i: number = inputArr.length; i >= 0; i--){
    list = { value: inputArr[i], rest: list }
  }
  return list;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}

function listToArray(inputList: any) {
    let outputArr: number[] = [];
    for (let node = inputList; node; node = node.rest) {
        if (node.value == undefined) {
            return outputArr;
        }
        outputArr.push(node.value);
    }
    return outputArr;
}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]

function prepend(element: any, list: any){
    let returnElem = {
      value: element,
      rest: list
    };
    return returnElem;
}
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

function nthRecursive(list: any, num: number): number {
    if (!list) {
        return undefined;
    } else if (num === 0) {
        return list.value;
    } else {
        return nthRecursive(list.rest, num - 1);
    }
}

console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
// → 20

//PROBLEM 4///////////////////////////////////////////////////////////
