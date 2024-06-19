const BaseOperation = require('./baseOperation');

class UnaryPlus extends BaseOperation {
    constructor() {
        super('u+', 3);
    }

    execute(a) {
        return +a;
    }
}

module.exports = UnaryPlus;