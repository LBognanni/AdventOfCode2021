import { Day } from "../day";

type Puzzle = {
  start: string[];
  rules: Record<string, string>;
};

class Day14 extends Day {
  constructor() {
    super(14);
  }

  parsePuzzle(input: string): Puzzle {
    const lines = input.split(/[\r\n]+/g).filter(Boolean);
    return {
      start: lines[0].split(""),
      rules: lines
        .slice(1)
        .map((l) => l.match(/([A-Z]+) -> ([A-Z])/))
        .reduce((acc, cur) => {
          if (cur) {
            acc[cur[1]] = cur[2];
          }
          return acc;
        }, {} as Record<string, string>),
    };
  }

  polymerize(
    input: Record<string, number>,
    rules: Record<string, string>
  ): Record<string, number> {
    let output: Record<string, number> = {};

    for (const [key, count] of Object.entries(input)) {
      const letter = rules[key];
      output[key[0] + letter] = (output[key[0] + letter] ?? 0) + count;
      output[letter + key[1]] = (output[letter + key[1]] ?? 0) + count;
    }

    return output;
  }

  solve(input: string, n: number): string {
    const puzzle = this.parsePuzzle(input);
    let pairs: Record<string, number> = {};

    for (let i = 1; i < puzzle.start.length; ++i) {
      let key = puzzle.start[i - 1] + puzzle.start[i];
      pairs[key] = (pairs[key] ?? 0) + 1;
    }

    for (let i = 0; i < n; ++i) {
      pairs = this.polymerize(pairs, puzzle.rules);
    }

    let countsPerLetters = Object.entries(pairs).reduce((acc, cur) => {
      acc[cur[0][0]] = (acc[cur[0][0]] ?? 0) + cur[1]; // count the first letter only to avoid double-counting the pairs
      return acc;
    }, {} as Record<string, number>);
    countsPerLetters[puzzle.start[puzzle.start.length-1]]++; //.. but also increment the last letter of the initial string otherwise it won't be counted!

    let cts = Object.values(countsPerLetters).sort((x, y) => x - y);

    return (cts[cts.length - 1] - cts[0]).toString();
  }

  solveForPartOne(input: string): string {
    return this.solve(input, 10);
  }

  solveForPartTwo(input: string): string {
    return this.solve(input, 40);
  }
}

export default new Day14();
