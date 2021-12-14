import day14 from "./index";

const example = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe("On Day 14", () => {
    it(`part 1 solves for the example input`, () => {
      expect(day14.solveForPartOne(example)).toBe("1588");
    });
    it(`part 2 solves for the example input`, () => {
      expect(day14.solveForPartTwo(example)).toBe("2188189693529");
    });
});
