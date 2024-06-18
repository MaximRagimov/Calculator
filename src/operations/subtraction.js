const BaseOperation = require('./baseOperation');

class Subtraction extends BaseOperation {
    constructor() {
        super('-', 1);
    }

    execute(a, b) {
        return a - b;
    }
}

module.exports = Subtraction;