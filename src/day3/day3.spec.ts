import day3 from './index';

const exampleInput=`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe('On Day 3', () =>{
    it(`returns the correct example output in part 1`, ()=>{
        expect(day3.solveForPartOne(exampleInput)).toBe('198');
    })
});