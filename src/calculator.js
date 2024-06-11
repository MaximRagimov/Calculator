const Parser = require('./parser');

class Calculator {
    constructor() {
        this.parser = new Parser();
    }

    calculate(expression) {
        const tokens = this.parser.parse(expression);
        const rpn = this.toReversePolishNotation(tokens);
        return this.evaluateRPN(rpn);
    }

    toReversePolishNotation(tokens) {
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

        const outputQueue = [];
        const operatorStack = [];

        tokens.forEach(token => {
            if(!isNaN(token)){
                outputQueue.push(token);
            } else if (/[+\-*/]/.test(token)) {
                while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            }
            // if (/\d/.test(token)) {
            //     outputQueue.push(token);
            // } else if (/[+\-*/]/.test(token)) {
            //     while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
            //         outputQueue.push(operatorStack.pop());
            //     }
            //     operatorStack.push(token);
            // } else if (token === '(') {
            //     operatorStack.push(token);
            // } else if (token === ')') {
            //     while (operatorStack[operatorStack.length - 1] != '(') {
            //         outputQueue.push(operatorStack.pop());
            //     }
            //     operatorStack.pop();
            // }
        });

        while (operatorStack.length) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    }

    evaluateRPN(rpn) {
        const stack = [];

        rpn.forEach(token => {
            // if (/\d/.test(token)) {
            //     stack.push(parseFloat(token));
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else {
                const b = stack.pop();
                const a = stack.pop();

                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                }
            }
        });

        return stack[0];
    }
}

module.exports = Calculator;