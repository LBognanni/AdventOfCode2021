import day9 from './index';

const example = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe('On Day 9', () =>{
    it(`part 1 solves for the example input`, ()=>{
        expect(day9.solveForPartOne(example)).toBe('15');
    })
});