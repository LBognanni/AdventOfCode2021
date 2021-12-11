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
  completeTable: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  openers = "([{<";
  openerFor: { [key: string]: string } = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };

  closerFor: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
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

  getAutoCompleteScore(line: string[]): number {
    let stack: string[] = [];

    for (const char of line) {
      if (this.openers.indexOf(char) >= 0) {
        stack.push(char);
      } else {
        stack.pop();
      }
    }

    return stack
      .reverse()
      .map((x) => this.completeTable[this.closerFor[x]])
      .reduce((acc, cur) => {
        acc = acc * 5 + cur;
        return acc;
      }, 0);
  }

  solveForPartTwo(input: string): string {
    let lines = input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((l) => l.split(""))
      .filter((l) => this.score(l) == 0);

    let scores = lines
      .map((l) => this.getAutoCompleteScore(l))
      .sort((x, y) => x - y);

    return scores[Math.floor(scores.length / 2)].toString();
  }
}

export default new Day10();
