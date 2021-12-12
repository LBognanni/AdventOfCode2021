import day12 from "./index";

const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

describe("On Day 12", () => {
  it(`part 1 solves for the example input`, () => {
    expect(day12.solveForPartOne(example)).toBe("10");
  });
});
