# Problem 1
## Month Names

Write a simple modular system to the ```weekDay``` module that can convert month number (zero-based, as in the ```Date``` type) to names and can convert names back to numbers. Give it its own namespace since it will need an internal array of month names, and use plain JavaScript, without any module loader system.

```javascript

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10

```

# Problem 2
## A Return to Electronic Life

Hoping that Chapter 7 is still somewhat fresh in your mind, think back to the system designed in that chapter and come up with a way to separate the code into modules. To refresh your memory, these are the functions and types defined in that chapter in order of appearance:
```
Vector
Grid
directions
directionNames
randomElement
BouncingCritter
elementFromChar
World
charFromElement
Wall
View
WallFollower
dirPlus
LifelikeWorld
Plant
PlantEater
SmartPlantEater
Tiger
```
Don't exaggerate and create too many modules. A book that starts a new chapter for every page would probably get on your nerves, if only because of all the space wasted on tiles. Similarly, having to open 10 files to read a tiny project isn't helpful. Aim for three to five modules.

You can choose to have some functions  become internal to their module and thus inaccessible to other modules.

There is no single correct solution here. Module organization is largely a matter of taste.

# Problem 3
## Circular Dependencies

A tricky subject in dependency management is circular dependencies, where module A depends on B, and B also depends on A. Many module systems simply forbid this. CommonJS modules allow a limited form: it works as long as the modules do not replace their default ```exports``` object with another value and start accessing each other's interface only after they finish loading.

Can you think of a way in which support for this feature could be implemented? Look back at the definition of ```require``` and consider what the function would have to do to allow this.