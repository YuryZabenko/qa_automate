import {Calculator} from "../calculator.js";
import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";

const calc = new Calculator();

describe('Unit tests for add method of Calculator', () => {
    test('Should return sum of positive numbers', () => {
        const a = 2;
        const b = 3;
        const c = 5;
        const result = calc.add(a, b, c);
        expect(result).toBe(10);
    })
    test('Should return sum of negative numbers', () => {
        const a = -10;
        const b = -3;
        const c = -5;
        const result = calc.add(a, b, c);
        expect(result).toBe(-18);
    })
    test('Should return sum of mixed values', () => {
        const a = 10;
        const b = -3;
        const c = 2;
        const result = calc.add(a, b, c);
        expect(result).toBe(9);
    })
    test('Should return zero without arguments', () => {
        const result = calc.add();
        expect(result).toBe(0);
    })
})
describe('Unit tests for multiply method of Calculator', () => {
    test('Should return product of positive numbers', () => {
        const a = 10;
        const b = 5;
        const c = 2;
        const result = calc.multiply(a, b, c);
        expect(result).toBe(100);
    })
    test('Should return product of negative numbers', () => {
        const a = -3;
        const b = -5;
        const c = -9;
        const result = calc.multiply(a, b, c);
        expect(result).toBe(-135);
    })
    test('Should return one after call without arguments', () => {
        const result = calc.multiply();
        expect(result).toBe(1);
    })
    test('Should return zero when multiplied by zero', () => {
        const a = 3;
        const b = 5;
        const c = 0;
        const result = calc.multiply(a, b, c);
        expect(result).toBe(0);
    })
})
describe('Unit tests for subtraction method of Calculator', () => {
    let spySubtraction
    beforeEach(() => {
        spySubtraction = jest.spyOn(calc, 'subtraction');
    })
    afterEach(() => {
        spySubtraction.mockRestore();
    })
    test('Should return difference of positive numbers', () => {
        const a = 11;
        const b = 5;
        const result = calc.subtraction(a, b);
        expect(result).toBe(6);
        expect(spySubtraction).toHaveBeenCalled();
        expect(spySubtraction).toHaveBeenCalledTimes(1);
        expect(spySubtraction).toHaveBeenCalledWith(a, b)
    })
    test('Should return difference of negative numbers', () => {
        const a = 5;
        const b = 10;
        const result = calc.subtraction(a, b);
        expect(result).toBe(-5);
        expect(spySubtraction).toHaveBeenCalled();
        expect(spySubtraction).toHaveBeenCalledTimes(1);
        expect(spySubtraction).toHaveBeenCalledWith(a, b)
    })
    test('Should return difference of zero and number', () => {
        const a = 0;
        const b = 10;
        const result = calc.subtraction(a, b);
        expect(result).toBe(-10);
        expect(spySubtraction).toHaveBeenCalled();
        expect(spySubtraction).toHaveBeenCalledTimes(1);
        expect(spySubtraction).toHaveBeenCalledWith(a, b);
    })
})
describe('Unit tests for divide method of Calculator', () => {
    test.each([
        [2, 10, 5],
        [1, 100, 100],
        [5000, 5000, 1]
    ])
    ('Should return %i when %i describe %i', (expected, a, b) => {
        expect(calc.divide(a, b)).toBe(expected);
    })
    test.each([
        [2.5, 10, 4],
        [-1.25, -100, 80],
        [0.625, -50, -80]
    ])('Should return %f when %i describe %i', (expected, a, b) => {
        expect(calc.divide(a, b)).toBe(expected);
    })
    test.each([
        [Infinity, 10, 0],
        [-Infinity, -4568, 0],
        [NaN, 0, 0]
    ])('Should return %s when %i divided by %i', (expected, a, b) => {
        expect(calc.divide(a, b)).toBe(expected);
    })
})
describe('Unit tests for exponentiation method of Calculator', () => {
    test('Should return positive number with positive argument', () => {
        const a = 5;
        const result = calc.exponentiation(a);
        expect(result).toBe(25);
    })
    test('Should return positive number with negative argument', () => {
        const a = -3;
        const result = calc.exponentiation(a);
        expect(result).toBe(9);
    })
    test('Should return zero with zero argument', () => {
        const a = 0;
        const result = calc.exponentiation(a);
        expect(result).toBe(0);
    })
})
