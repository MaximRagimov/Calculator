const BaseOperation = require('./baseOperation');

class Division extends BaseOperation {
    constructor() {
        super('/', 2);
    }

    execute(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}

module.exports = Division;