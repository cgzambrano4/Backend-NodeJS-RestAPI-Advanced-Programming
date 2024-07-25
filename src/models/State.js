class State {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }
}
// manager states : 1 = pending, 2 = approved, 3 = rejected
module.exports = State;