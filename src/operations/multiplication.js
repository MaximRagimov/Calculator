const BaseOperation = require('./baseOperation');

class Multiplication extends BaseOperation {
    constructor() {
        super('*', 2);
    }

    execute(a, b) {
        return a * b;
    }
}

module.exports = Multiplication;