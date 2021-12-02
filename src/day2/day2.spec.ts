import day2 from './index';

describe('On Day 2', () =>{
    it(`part1 returns expected test value`, ()=>{
        expect(day2.solveForPartOne(`forward 5
down 5
forward 8
up 3
down 8
forward 2`)).toBe('150');
    })
});