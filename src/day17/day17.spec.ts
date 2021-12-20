import day17 from "./index";

const example = `target area: x=20..30, y=-10..-5`;

describe("On Day 17", () => {
  it(`can parse the example box`, () => {
    expect(day17.parseBox(example)).toMatchObject({
      left: 20,
      right: 30,
      top: -5,
      bottom: -10,
    });
  });
  it(`part 1 solves for example input`, () => {
    expect(day17.solveForPartOne(example)).toBe("45");
  });
  it(`part 2 solves for example input`, () => {
    expect(day17.solveForPartTwo(example)).toBe("112");
  });
});
