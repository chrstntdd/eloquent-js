import {elementFromChar} from './direction'

export let actionTypes = {
    grow: function (critter: any) {
        critter.energy += 0.5;
        return true;
    },
    move: function (critter: any, vector: any, action: any) {
        let dest = this.checkDestination(action, vector);
        if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
            return false;
        critter.energy -= 1;
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
        return true;
    },
    eat: function (critter: any, vector: any, action: any) {
        let dest = this.checkDestination(action, vector);
        let atDest = dest != null && this.grid.get(dest);
        if (!atDest || atDest.energy == null)
            return false;
        critter.energy += atDest.energy;
        this.grid.set(dest, null);
        return true;
    },

    reproduce: function (critter: any, vector: any, action: any) {
        let baby = elementFromChar(this.legend, critter.originChar);
        let dest = this.checkDestination(action, vector);
        if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
            return false;
        critter.energy -= 2 * baby.energy;
        this.grid.set(dest, baby);
        return true;
    },

    stay: function (critter: any, vector: any, action: any) {
        return false;
    }
}