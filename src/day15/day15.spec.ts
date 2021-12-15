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
});
