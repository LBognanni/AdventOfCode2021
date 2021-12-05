import day5 from "./index";

const sample = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

describe("On Day 5", () => {
  it(`can parse a point array`, () => {
    expect(
      day5.parsePoints(`
1,2 -> 3,4

333,0 -> 1,5555`)
    ).toMatchObject([
      {
        p1: { x: 1, y: 2 },
        p2: { x: 3, y: 4 },
      },
      {
        p1: { x: 333, y: 0 },
        p2: { x: 1, y: 5555 },
      },
    ]);
  });

  it(`Can expand a horizontal line`, () => {
    expect([
      ...day5.expandLine({ p1: { x: 1, y: 2 }, p2: { x: 5, y: 2 } }, false),
    ]).toMatchObject([
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ]);
  });

  it(`Can expand a vertical line`, () => {
    expect([
      ...day5.expandLine({ p1: { x: 1, y: 5 }, p2: { x: 1, y: 1 } }, false),
    ]).toMatchObject([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ]);
  });

  it(`Can expand a diagonal line`, () => {
    expect([
      ...day5.expandLine({ p1: { x: 1, y: 1 }, p2: { x: 4, y: 4 } }, true),
    ]).toMatchObject([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ]);
  });

  it(`Can expand a different diagonal line`, () => {
    expect([
      ...day5.expandLine({ p1: { x: 4, y: 1 }, p2: { x: 1, y: 4 } }, true),
    ]).toMatchObject([
      { x: 4, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 4 },
    ]);
  });

  it(`part 1 returns the expected value for the example input`, () => {
    expect(day5.solveForPartOne(sample)).toBe("5");
  });

  it(`part 2 returns the expected value for the example input`, () => {
    expect(day5.solveForPartTwo(sample)).toBe("12");
  });
});
