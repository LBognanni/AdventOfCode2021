import { Day } from "../day";

class Day10 extends Day {
  constructor() {
    super(10);
  }

  scoreTable: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  openers = "([{<";
  openerFor: { [key: string]: string } = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };

  score(line: string[]): number {
    let stack: string[] = [];

    for (const char of line) {
      if (this.openers.indexOf(char) >= 0) {
        stack.push(char);
      } else {
        if (stack.pop() != this.openerFor[char]) {
          return this.scoreTable[char];
        }
      }
    }

    return 0;
  }

  solveForPartOne(input: string): string {
    let lines = input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((l) => l.split(""));

    return lines
      .map((l) => this.score(l))
      .reduce((acc, cur) => {
        acc += cur;
        return acc;
      }, 0)
      .toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day10();
