import day7 from "./index";

const example = `16,1,2,0,4,2,7,1,2,14`;

describe("On Day 7", () => {
  it(`part 1 can solve for example`, () => {
    expect(day7.solveForPartOne(example)).toBe("37");
  });
});
