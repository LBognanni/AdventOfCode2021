import day10 from "./index";

const example = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

describe("On Day 10", () => {
  it(`part 1 solves for the example input`, () => {
    expect(day10.solveForPartOne(example)).toBe("26397");
  });

  it(`Should calculate the right autocomplete score`, () => {
    expect(day10.getAutoCompleteScore('[({(<(())[]>[[{[]{<()<>>'.split(''))).toBe(288957);
  });
  it(`part 2 solves for the example input`, () => {
    expect(day10.solveForPartTwo(example)).toBe("288957");
  });
});
