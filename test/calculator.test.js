const { expect } = require('chai');
const Calculator = require('../src/calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
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
});