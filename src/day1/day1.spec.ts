import day1 from './index';

describe('On Day 1', () =>{
    it(`Should solve part 1 for the example case`, ()=>{
        expect(day1.solveForPartOne(`199
200
208
210
200
207
240
269
260
263`)).toBe("7");
    })

    it(`Should solve part 2 for the example case`, ()=>{
        expect(day1.solveForPartTwo(`199
200
208
210
200
207
240
269
260
263`)).toBe("5");
    });
});