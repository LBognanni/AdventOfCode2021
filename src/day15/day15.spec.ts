import day15 from "./index";

const example = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

describe("On Day 15", () => {
  it(`part 1 solves for the example input`, () => {
    expect(day15.solveForPartOne(example)).toBe("40");
  });
  it(`makes a big map`, () => {
    expect(day15.makeBigMap([[8]])).toMatchObject([
      [8, 9, 1, 2, 3],
      [9, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7],
    ]);
  });
  it(`part 2 solves for the example input`, () => {
    expect(day15.solveForPartTwo(example)).toBe("315");
  });
});
