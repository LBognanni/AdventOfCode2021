import day7 from "./index";

const example = `16,1,2,0,4,2,7,1,2,14`;

describe("On Day 7", () => {
  it(`part 1 can solve for example`, () => {
    expect(day7.solveForPartOne(example)).toBe("37");
  });

  it(`can calculate the right fuel distance`, () => {
    expect(day7.fuelDistance(4)).toBe(10);
    expect(day7.fuelDistance(5)).toBe(15);
    expect(day7.fuelDistance(11)).toBe(66);
    expect(day7.fuelDistance(9)).toBe(45);
  });
  it(`part 2 can solve for example`, () => {
    expect(day7.solveForPartTwo(example)).toBe("168");
  });
});
