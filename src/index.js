const readline = require('readline');
const Calculator = require('./calculator');
const Addition = require('./operations/addition');
const Subtraction = require('./operations/subtraction');
const Multiplication = require('./operations/multiplication');
const Division = require('./operations/division');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calculator = new Calculator();
calculator.registerOperation(new Addition());
calculator.registerOperation(new Subtraction());
calculator.registerOperation(new Multiplication());
calculator.registerOperation(new Division());

rl.question('Введите выражение: ', (expression) => {
    try {
        const result = calculator.calculate(expression);
        console.log(`Результат: ${result}`);
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
    rl.close();
});