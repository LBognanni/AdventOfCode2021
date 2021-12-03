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
    const lines = input.split(/[\r\n]/).filter(Boolean);

    let mostCommonAt: (arg0: string[], arg1: number) => string = (arr, index) =>
      arr.filter((l) => l.charAt(index) === "1").length >= arr.length / 2
        ? "1"
        : "0";

    let findTheOneLine: (
      arg0: (arg0: string, arg1: string) => boolean
    ) => string = (fun) => {
      let arr = lines;
      let index = 0;
      while (arr.length > 1) {
        const char = mostCommonAt(arr, index);
        arr = arr.filter((l) => fun(l.charAt(index), char));
        index++;
      }
      return arr[0];
    };

    const oxygenRating = findTheOneLine((x, y) => x === y);
    const co2Rating = findTheOneLine((x, y) => x !== y);
    return (parseInt(oxygenRating, 2) * parseInt(co2Rating, 2)).toString();
  }
}

export default new Day3();
