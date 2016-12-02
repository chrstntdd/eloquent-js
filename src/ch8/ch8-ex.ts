// PROBLEM 1

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a: number, b: number): number {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a: number, b: number): number {
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (!(error instanceof MultiplicatorUnitFailure)) {
        throw error;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64