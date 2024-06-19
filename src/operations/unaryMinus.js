const BaseOperation = require('./baseOperation');

class UnaryMinus extends BaseOperation {
    constructor() {
        super('u-', 3);
    }

    execute(a) {
        return -a;
    }
}

module.exports = UnaryMinus;