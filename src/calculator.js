const Parser = require('./parser');

class Calculator {
    constructor() {
        this.parser = new Parser();
        this.operations = {};
    }

    registerOperation(operation) {
        this.operations[operation.symbol] = operation;
    }

    calculate(expression) {
        try {
            const tokens = this.parser.parse(expression);
            const rpn = this.toReversePolishNotation(tokens);
            return this.evaluateRPN(rpn);
        } catch (error) {
            throw new Error(`Calculation error: ${error.message}`);
        }
    }

    toReversePolishNotation(tokens) {

        const outputQueue = [];
        const operatorStack = [];

        tokens.forEach(token => {
            if (!isNaN(token)) {
                outputQueue.push(token);
            } else if (this.operations[token]) {
                const operation = this.operations[token];
                while (operatorStack.length && this.operations[operatorStack[operatorStack.length - 1]] &&
                this.operations[operatorStack[operatorStack.length - 1]].precedence >= operation.precedence) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                if (operatorStack.length && operatorStack[operatorStack.length - 1] === '(') {
                    operatorStack.pop();
                } else {
                    throw new Error('Mismatched parentheses');
                }
            }
        });

        while (operatorStack.length) {
            const op = operatorStack.pop();
            if (op === '(' || op === ')') {
                throw new Error('Mismatched parentheses');
            }
            outputQueue.push(op);
        }

        return outputQueue;
    }

    evaluateRPN(rpn) {
        const stack = [];

        rpn.forEach(token => {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else if (this.operations[token]) {
                if (stack.length < 2) {
                    throw new Error('Invalid expression');
                }
                const b = stack.pop();
                const a = stack.pop();
                stack.push(this.operations[token].execute(a, b));
            } else {
                throw new Error(`Unknown token: ${token}`);
            }
        });

        if (stack.length !== 1) {
            throw new Error('Invalid expression');
        }

        return stack[0];
    }
}

module.exports = Calculator;