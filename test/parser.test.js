const { expect } = require('chai');
const Parser = require('../src/parser');

describe('Parser', () => {
    let parser;

    beforeEach(() => {
        parser = new Parser();
    });

    it('should correctly parse addition', () => {
        expect(parser.parse('1+2')).to.deep.equal(['1', '+', '2']);
    });

    it('should correctly parse complex expressions', () => {
        expect(parser.parse('1+2-3*4/5')).to.deep.equal(['1', '+', '2', '-', '3', '*', '4', '/', '5']);
    });

    it('should correctly parse expressions with parentheses', () => {
        expect(parser.parse('(1+2)*3')).to.deep.equal(['(', '1', '+', '2', ')', '*', '3']);
    });

    it('should correctly parse decimal numbers', () => {
        expect(parser.parse('2.5*3')).to.deep.equal(['2.5', '*', '3']);
    });

    it('should correctly parse expressions with unary minus', () => {
        expect(parser.parse('-5+3')).to.deep.equal(['u-', '5', '+', '3']);
        expect(parser.parse('(-5)+3')).to.deep.equal(['(', 'u-', '5', ')', '+', '3']);
    });

    it('should correctly parse expressions with unary plus', () => {
        expect(parser.parse('+5-3')).to.deep.equal(['u+', '5', '-', '3']);
        expect(parser.parse('(+5)-3')).to.deep.equal(['(', 'u+', '5', ')', '-', '3']);
    });

    it('should correctly parse expressions with multiple unary operators', () => {
        expect(parser.parse('-5+(-3)')).to.deep.equal(['u-', '5', '+', '(', 'u-', '3', ')']);
        expect(parser.parse('+5+(-3)')).to.deep.equal(['u+', '5', '+', '(', 'u-', '3', ')']);
    });

    it('should correctly parse expressions with unary operators and parentheses', () => {
        expect(parser.parse('-(5+3)*2')).to.deep.equal(['u-', '(', '5', '+', '3', ')', '*', '2']);
    });

    it('should throw an error for invalid characters', () => {
        expect(() => parser.parse('2+3a')).to.throw('Invalid character: a');
    });

    it('should throw an error for mismatched parentheses', () => {
        expect(() => parser.parse('(2+3')).to.throw('Mismatched parentheses');
        expect(() => parser.parse('2+3)')).to.throw('Mismatched parentheses');
    });

    it('should correctly parse subtraction', () => {
        expect(parser.parse('5-3')).to.deep.equal(['5', '-', '3']);
    });

    it('should correctly parse multiplication', () => {
        expect(parser.parse('4*2')).to.deep.equal(['4', '*', '2']);
    });

    it('should correctly parse division', () => {
        expect(parser.parse('8/4')).to.deep.equal(['8', '/', '4']);
    });

    it('should correctly parse modulo operation', () => {
        expect(parser.parse('5%3')).to.deep.equal(['5', '%', '3']);
    })
});