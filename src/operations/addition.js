const BaseOperation = require('./baseOperation');

class Addition extends BaseOperation {
    constructor() {
        super('+', 1);
    }

    execute(a, b) {
        return a + b;
    }
}

module.exports = Addition;