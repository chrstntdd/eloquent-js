// PROBLEM 1
function MultiplicatorUnitFailure() { }
function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}
function reliableMultiply(a, b) {
    return a * b;
}
console.log(reliableMultiply(8, 8));
// → 64 
