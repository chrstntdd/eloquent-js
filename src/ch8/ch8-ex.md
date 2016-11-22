# Problem 1
## Retry

Say you have a function ```primativeMiltiply``` that, in 50% of cases, multiplies two numbers and in the other 50%, raises and exception of type ```MultiplicatorUnitFailure```. Write  a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.

Make sure you handle on the exceptions you are trying to handle.

```javascript
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  // Your code here.
}

console.log(reliableMultiply(8, 8));
// → 64
```

# Problem 2
## The Locked Box

Consider the following (rather contrived) object:

```javascript
var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};
```

Its a box with a lock. Inside is an array, but you can get at it only when the box is unlocked. Directly accessing the _content property is not allowed.

Write a function called ```withBoxUnlocked``` that takes a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception.

```javascript
function withBoxUnlocked(body) {
  // Your code here.
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true
```

For extra points, make sure that if you call ```withBoxUnlocked``` when the box is already unlocked, the box stays unlocked.