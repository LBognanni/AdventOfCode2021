import day1 from './index';

describe('On Day 1', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day1.solveForPartOne('hello')).toBe('hello');
    })
});