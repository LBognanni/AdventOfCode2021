import day11 from "./index";

const example = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

describe("On Day 11", () => {
  it(`part 1 solves for the example input`, () => {
    expect(day11.solveForPartOne(example)).toBe("1656");
  });
  it(`part 2 solves for the example input`, () => {
    expect(day11.solveForPartTwo(example)).toBe("195");
  });
});
