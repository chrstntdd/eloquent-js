function findMin(num1:number, num2:number) {
  if (num1 > num2){
    return num2;
  } else {
    return num1;
  }
}

console.log(findMin(8,2)) // 2
console.log(findMin(99,100)) //99
console.log(findMin(1,27)) //3