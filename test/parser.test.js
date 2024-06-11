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

    it('should correctly parse subtraction', () => {
        expect(parser.parse('5-3')).to.deep.equal(['5', '-', '3']);
    });

    it('should correctly parse multiplication', () => {
        expect(parser.parse('4*2')).to.deep.equal(['4', '*', '2']);
    });

    it('should correctly parse division', () => {
        expect(parser.parse('8/4')).to.deep.equal(['8', '/', '4']);
    });

    it('should correctly parse parentheses', () => {
        expect(parser.parse('(2+3)*2')).to.deep.equal(['(', '2', '+', '3', ')', '*', '2']);
    });

    it('should correctly parse complex expressions', () => {
        expect(parser.parse('1+2-3*4/2+(6/2)')).to.deep.equal(['1', '+', '2', '-', '3', '*', '4', '/', '2', '+', '(', '6', '/', '2', ')']);
    });
});