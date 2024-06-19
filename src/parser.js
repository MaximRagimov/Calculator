const operations = require('./operations');

class Parser {
    constructor() {
        this.supportedOperations = operations;
    }
    parse(expression) {
        const tokens = [];
        let numberBuffer = '';
        let expectingUnary = true; // Флаг, указывающий на ожидание унарного оператора
        let openParenthesesCount = 0; // Счётчик открывающих скобок

        // for (let char of expression) {
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (/\d|\./.test(char)) {
                numberBuffer += char;
                expectingUnary = false; // Число завершает ожидание унарного оператора
            } else if (this.isOperator(char) /*/[+\-*!/()]/.test(char)*/ || this.isUnaryOperator(char) || char === '(' || char === ')') {
                if (numberBuffer) {
                    tokens.push(numberBuffer);
                    numberBuffer = '';
                }
                if (char === '-' && expectingUnary) {
                    tokens.push('u-'); // Унарный минус
                } else if (char === '+' && expectingUnary) {
                    tokens.push('u+'); // Унарный плюс
                } else {
                    tokens.push(char);
                }

                if (char === '(') {
                    openParenthesesCount++;
                    expectingUnary = true;
                } else if (char === ')') {
                    openParenthesesCount--;
                    if (openParenthesesCount < 0) {
                        throw new Error('Mismatched parentheses');
                    }
                } else {
                    // expectingUnary = char === '+' || char === '-' || char === '*' || char === '/' || char === '%'; // После операторов ожидается унарный оператор
                    expectingUnary = this.isUnaryOperator(char);
                }
            } else if (char.trim() === '') {
                continue; // игнорируем пробелы
            } else {
                throw new Error(`Invalid character: ${char}`);
            }
        }

        if (numberBuffer) {
            tokens.push(numberBuffer);
        }

        if (openParenthesesCount !== 0) {
            throw new Error('Mismatched parentheses');
        }

        return tokens;
    }

    isOperator(char) {
        return this.supportedOperations.hasOwnProperty(char);
    }

    isUnaryOperator(char) {
        return char === '+' || char === '-';
    }
}

module.exports = Parser;