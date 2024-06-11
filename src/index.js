const readline = require('readline');
const Calculator = require('./calculator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calculator = new Calculator();

rl.question('Введите выражение: ', (expression) => {
    try {
        const result = calculator.calculate(expression);
        console.log(`Результат: ${result}`);
    } catch (error) {
        console.error('Ошибка при вычислении выражения:', error.message);
    }
    rl.close();
});