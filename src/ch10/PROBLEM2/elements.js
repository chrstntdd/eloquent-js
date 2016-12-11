function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function BouncingCritter() {
    this.direction = randomElement(directionNames);
};
BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) != ' ')
        this.direction = view.find(' ') || 's';
    return {
        type: 'move',
        direction: this.direction
    };
};



function Wall() {}



function WallFollower() {
    this.dir = 's';
}
WallFollower.prototype.act = function (view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != ' ')
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != ' ') {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
    }
    return {
        type: 'move',
        direction: this.dir
    };
};

function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function (view) {
    if (this.energy > 15) {
        var space = view.find(' ');
        if (space)
            return {
                type: 'reproduce',
                direction: space
            };
    }
    if (this.energy < 20)
        return {
            type: 'grow'
        };
};

function PlantEater() {
    this.energy = 20;
}
PlantEater.prototype.act = function (view) {
    var space = view.find(' ');
    if (this.energy > 60 && space)
        return {
            type: 'reproduce',
            direction: space
        };
    var plant = view.find('*');
    if (plant)
        return {
            type: 'eat',
            direction: plant
        };
    if (space)
        return {
            type: 'move',
            direction: space
        };
};

function SmartPlantEater(energy, dir) {
    this.energy = 20;
    this.dir = randomElement(directionNames);
}
SmartPlantEater.prototype.act = function (view) {
    var space = view.find(' ');
    var plants = view.findAll('*');
    if (this.energy > 95 && space)
        return {
            type: 'reproduce',
            direction: space
        };
    if (plants.length > 1)
        return {
            type: 'eat',
            direction: randomElement(plants)
        };
    if (view.look(this.dir) != ' ' && space)
        this.dir = space;
    return {
        type: 'move',
        direction: this.dir
    };
};

function Tiger(energy, dir, memory) {
    this.energy = 90;
    this.dir = randomElement(directionNames);
    this.memory = []; //holds count of number of prey around predator each turn.
}
Tiger.prototype.act = function (view) {
    var seenEachTurn = this.memory.reduce(function (a, b) {
        return a + b;
    }, 0) / this.memory.length;
    var prey = view.findAll('O');
    var space = view.find(' ');
    this.memory.push(prey.length);
    if (this.memory.length > 5)
        this.memory.shift();
    if (prey.length && seenEachTurn > 0.33)
        return {
            type: 'eat',
            direction: randomElement(prey)
        };
    if (seenEachTurn < 0.10)
        return {
            type: 'stay',
            direction: undefined
        };
    if (this.energy > 300 && space)
        return {
            type: 'reproduce',
            direction: space
        };
    if (view.look(this.dir) != ' ' && space)
        this.dir = space;
    return {
        type: 'move',
        direction: this.dir
    };
};
    

var valley = new LifelikeWorld(
    ['############################',
        '#####                 ######',
        '##   ***                **##',
        '#   *##**         **  O  *##',
        '#    ***     O    ##**    *#',
        '#       O         ##***    #',
        '#                 ##**     #',
        '#   O       #*             #',
        '#*          #**       O    #',
        '#***        ##**    O    **#',
        '##****     ###***       *###',
        '############################'
    ], {
        '#': Wall,
        'O': PlantEater,
        '*': Plant
    }
);