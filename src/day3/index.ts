import { Day } from "../day";

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const lines = input.split(/[\r\n]/).filter(Boolean);
    const wordLength = lines[0].length;

    let mostCommonAt: (arg0: number) => string = (index) =>
      lines.filter((l) => l.charAt(index) === "1").length >= lines.length / 2
        ? "1"
        : "0";

    let gamma: string[] = [];
    for (let i = 0; i < wordLength; ++i) {
      gamma.push(mostCommonAt(i));
    }
    const gammaValue = parseInt(gamma.join(""), 2);

    const mask = parseInt("1".repeat(wordLength), 2);
    const epsilon = gammaValue ^ mask;
    return (gammaValue * epsilon).toString();
  }

  solveForPartTwo(input: string): string {
    return "";
  }
}

export default new Day3();
