import day13 from './index';

const example = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe('On Day 13', () =>{

    it(`can parse a puzzle`, () =>{
        const puzzle = day13.parsePuzzle(example);
        expect(puzzle.page.points.length).toBe(18);
        expect(puzzle.instructions).toMatchObject([
            { axis: "y", d: 7},
            { axis: "x", d: 5},
        ]);
    })

    it(`part 1 solves for the example input`, ()=>{
        expect(day13.solveForPartOne(example)).toBe('17');
    })
});