//PROBLEM 1
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
    
