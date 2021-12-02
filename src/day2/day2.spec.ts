import day2 from './index';


const demoInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe('On Day 2', () =>{
    it(` returns the expected test value in part 1`, ()=>{
        expect(day2.solveForPartOne(demoInput)).toBe('150');
    })

    it(` returns the expected test value in part 2`, ()=>{
        expect(day2.solveForPartTwo(demoInput)).toBe('900');
    })
});