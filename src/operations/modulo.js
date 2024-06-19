class Modulo {
    constructor() {
        this.symbol = '%';
        this.precedence = 2
    }

    execute(a, b) {
        return a % b;
    }
}

module.exports = Modulo;