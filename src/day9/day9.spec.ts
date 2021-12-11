import day9 from './index';

const example = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe('On Day 9', () =>{
    it(`part 1 solves for the example input`, ()=>{
        expect(day9.solveForPartOne(example)).toBe('15');
    });

    it(`calculates the right basin size`, () => {
        expect(day9.getBasinSize(day9.getMap(example), {x: 0, y: 0})).toBe(3);
        expect(day9.getBasinSize(day9.getMap(example), {x: 9, y: 0})).toBe(9);
    });

    it(`part 2 solves for the example input`, ()=>{
        expect(day9.solveForPartTwo(example)).toBe('1134');
    });
});