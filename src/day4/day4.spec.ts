import day4 from "./index";

const example = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

describe("On Day 4", () => {
  it(`Can parse a simple puzzle`, () => {
      expect(day4.parsePuzzle(`1,2,3,4,5,6
1 1 1
2 2 2
3 3 3

1 2 3
1 2 3
1 2 3`)).toMatchObject({
        draws: [1,2,3,4,5,6],
        boards:[
            [
                {x:0,y:0,num:1,mark:false},{x:1,y:0,num:1,mark:false},{x:2,y:0,num:1,mark:false},
                {x:0,y:1,num:2,mark:false},{x:1,y:1,num:2,mark:false},{x:2,y:1,num:2,mark:false},
                {x:0,y:2,num:3,mark:false},{x:1,y:2,num:3,mark:false},{x:2,y:2,num:3,mark:false},
            ],
            [
                {x:0,y:0,num:1,mark:false},{x:1,y:0,num:2,mark:false},{x:2,y:0,num:3,mark:false},
                {x:0,y:1,num:1,mark:false},{x:1,y:1,num:2,mark:false},{x:2,y:1,num:3,mark:false},
                {x:0,y:2,num:1,mark:false},{x:1,y:2,num:2,mark:false},{x:2,y:2,num:3,mark:false},
            ],
        ]
      });
  });
  it(`Part 1 solves for example case`, () => {
    expect(day4.solveForPartOne(example)).toBe("4512");
  });
  it(`Part 2 solves for example case`, () => {
    expect(day4.solveForPartTwo(example)).toBe("1924");
  });
});
