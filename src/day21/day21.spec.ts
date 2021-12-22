import day21 from "./index";

const example = `Player 1 starting position: 4
Player 2 starting position: 8`;

describe("On Day 21", () => {
  it(`part 1 solves for the example input`, () => {
    expect(day21.solveForPartOne(example)).toBe("739785");
  });

  it(`part 1 solves for the example input`, () => {
    expect(day21.solveForPartTwo(example)).toBe("444356092776315");
  });

});
