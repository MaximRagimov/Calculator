class BaseOperation {
    constructor(symbol, precedence) {
        this.symbol = symbol;
        this.precedence = precedence;
    }

    execute(a, b) {
        throw new Error('Execute method should be implemented in subclasses');
    }
}

module.exports = BaseOperation;
