const { expect } = require('chai');
const Calculator = require('../src/calculator');
const Addition = require('../src/operations/addition');
const Subtraction = require('../src/operations/subtraction');
const Multiplication = require('../src/operations/multiplication');
const Division = require('../src/operations/division');
const UnaryMinus = require('../src/operations/unaryMinus');
const UnaryPlus = require('../src/operations/unaryPlus');
const Modulo = require('../src/operations/modulo');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
        calculator.registerOperation(new Addition());
        calculator.registerOperation(new Subtraction());
        calculator.registerOperation(new Multiplication());
        calculator.registerOperation(new Division());
        calculator.registerOperation(new UnaryMinus());
        calculator.registerOperation(new UnaryPlus());
        calculator.registerOperation(new Modulo());
    });

    it('should correctly add two numbers', () => {
        expect(calculator.calculate('1+2')).to.equal(3);
    });

    it('should correctly subtract two numbers', () => {
        expect(calculator.calculate('5-3')).to.equal(2);
    });

    it('should correctly multiply two numbers', () => {
        expect(calculator.calculate('4*2')).to.equal(8);
    });

    it('should correctly divide two numbers', () => {
        expect(calculator.calculate('8/4')).to.equal(2);
    });

    it('should correctly handle decimal numbers', () => {
        expect(calculator.calculate('2.5*2')).to.equal(5);
    });

    it('should correctly handle complex expressions', () => {
        expect(calculator.calculate('1+2-3*4/2+(6/2)')).to.equal(0);
    });

    it('should correctly handle expressions with parentheses affecting the result', () => {
        expect(calculator.calculate('(2+3)*2')).to.equal(10);
    });

    it('should throw an error for invalid characters', () => {
        expect(() => calculator.calculate('2+3a')).to.throw('Calculation error: Invalid character: a');
    });

    it('should throw an error for mismatched parentheses', () => {
        expect(() => calculator.calculate('(2+3*2')).to.throw('Calculation error: Mismatched parentheses');
        expect(() => calculator.calculate('2+3)*2')).to.throw('Calculation error: Mismatched parentheses');
    });

    // TODO: подобные выражения считать за ошибку?
    // it('should throw an error for invalid expression', () => {
    //     expect(() => calculator.calculate('2++3')).to.throw('Calculation error: Invalid expression');
    // });

    it('should throw an error for division by zero', () => {
        expect(() => calculator.calculate('4/0')).to.throw('Calculation error: Division by zero');
    });

    it('should correctly handle unary minus', () => {
        expect(calculator.calculate('-5+3')).to.equal(-2);
        expect(calculator.calculate('(-5)+3')).to.equal(-2);
    });

    it('should correctly handle unary plus', () => {
        expect(calculator.calculate('+5-3')).to.equal(2);
        expect(calculator.calculate('(+5)-3')).to.equal(2);
    });

    it('should correctly handle modulo operation', () => {
        expect(calculator.calculate('5%3')).to.equal(2);
        expect(calculator.calculate('10%4')).to.equal(2);
    });

    it('should correctly handle complex expressions with unary operators', () => {
        expect(calculator.calculate('-5+3*(-2)')).to.equal(-11);
        expect(calculator.calculate('-(5+3)*2')).to.equal(-16);
    });
});