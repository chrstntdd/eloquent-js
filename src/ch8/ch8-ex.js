// PROBLEM 1
function MultiplicatorUnitFailure() { }
function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}
function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        }
        catch (error) {
            if (!(error instanceof MultiplicatorUnitFailure)) {
                throw error;
            }
        }
    }
}
console.log(reliableMultiply(8, 8));
// → 64
//PROBLEM 2
//Provided by text
var box = {
    locked: true,
    unlock: function () {
        this.locked = false;
    },
    lock: function () {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked)
            throw new Error("Locked!");
        return this._content;
    }
};
function withBoxUnlocked(body) {
    var locked = box.locked;
    if (!locked) {
        return body();
    }
    box.unlock();
    try {
        body();
    }
    catch (error) {
        console.log('There was an error: ' + error);
    }
    finally {
        box.lock();
    }
}
withBoxUnlocked(function () {
    box.content.push("gold piece");
});
try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
}
catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
// → true 
