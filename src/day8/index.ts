import { Day } from "../day";

class Day8 extends Day {
  numbersLookup = [
    ["a", "b", "c", "e", "f", "g"],
    ["c", "f"],
    ["a", "c", "d", "e", "g"],
    ["a", "c", "d", "f", "g"],
    ["b", "c", "d", "f"],
    ["a", "b", "d", "f", "g"],
    ["a", "b", "d", "e", "f", "g"],
    ["a", "c", "f"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "f", "g"],
  ];

  constructor() {
    super(8);
  }

  solveForPartOne(input: string): string {
    const lines = input.split(/[\r\n]/g).filter(Boolean);

    let count = 0;
    const uniqueNumbers = [1, 4, 7, 8];

    for (const line of lines) {
      const outputValues = line.split("|")[1].split(" ").filter(Boolean);
      for (const value of outputValues) {
        for (const unique of uniqueNumbers) {
          if (value.length == this.numbersLookup[unique].length) {
            count++;
            break;
          }
        }
      }
    }

    return count.toString();
  }

  solveForPartTwo(input: string): string {
    return "input";
  }
}

export default new Day8();
