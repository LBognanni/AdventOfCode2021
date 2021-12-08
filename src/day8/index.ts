import { Day } from "../day";

type match = {
  source: string;
  destination: string;
};

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
        for (const idx of uniqueNumbers) {
          if (value.length == this.numbersLookup[idx].length) {
            count++;
            break;
          }
        }
      }
    }

    return count.toString();
  }

  getDictionary(input: string): any {
    const line = input.split("|");
    const signals = line[0]
      .split(" ")
      .filter(Boolean)
      .map((signal) => signal.split(""));
    const outputValues = line[1].split(" ").filter(Boolean);

    let possibilities: { [key: string]: string[] } = {
      a: ["a", "b", "c", "d", "e", "f", "g"],
      b: ["a", "b", "c", "d", "e", "f", "g"],
      c: ["a", "b", "c", "d", "e", "f", "g"],
      d: ["a", "b", "c", "d", "e", "f", "g"],
      e: ["a", "b", "c", "d", "e", "f", "g"],
      f: ["a", "b", "c", "d", "e", "f", "g"],
      g: ["a", "b", "c", "d", "e", "f", "g"],
    };

    let knownNumbers: string[][] = [];
    const uniqueNumbers = [1, 4, 7, 8];

    for (const signalArray of signals) {
      for (const idx of uniqueNumbers) {
        if (signalArray.length == this.numbersLookup[idx].length) {
          knownNumbers[idx] = signalArray;
          for (const char of this.numbersLookup[idx]) {
            possibilities[char] = possibilities[char].filter((x) =>
              signalArray.includes(x)
            );
          }
        }
      }
    }

    let diff = knownNumbers[4].filter((x) => !knownNumbers[1].includes(x));
    let single = (x: string[][]) => {
      if (x.length != 1) throw "found multiple elements:" + x.join(" - ");
      return x[0];
    };

    knownNumbers[3] = single(
      signals.filter(
        (x) => knownNumbers[1].every((c) => x.includes(c)) && x.length == 5
      )
    );
    knownNumbers[9] = single(
      signals.filter(
        (x) =>
          knownNumbers[1].every((c) => x.includes(c)) &&
          diff.every((c) => x.includes(c)) &&
          x.length == 6
      )
    );
    knownNumbers[5] = single(
      signals.filter((x) => diff.every((c) => x.includes(c)) && x.length == 5)
    );
    knownNumbers[6] = single(
      signals.filter(
        (x) =>
          diff.every((c) => x.includes(c)) &&
          x.length == 6 &&
          x.join() != knownNumbers[9].join()
      )
    );
    knownNumbers[2] = single(
      signals.filter(
        (x) =>
          x.length == 5 &&
          x.join() != knownNumbers[5].join() &&
          x.join() != knownNumbers[3].join()
      )
    );
    knownNumbers[0] = single(
      signals.filter(
        (x) =>
          x.length == 6 &&
          x.join() != knownNumbers[6].join() &&
          x.join() != knownNumbers[9].join()
      )
    );

    function filterWith(arr: string[], numbers: number[]) {
      let letters = numbers.flatMap((x) => knownNumbers[x]);
      return arr.filter((x) => !letters.includes(x));
    }

    possibilities.a = filterWith(possibilities.a, [1, 4]);
    possibilities.b = filterWith(possibilities.b, [1, 2, 3, 7]);
    possibilities.c = filterWith(possibilities.c, [5, 6]);
    possibilities.d = filterWith(possibilities.d, [0, 1, 7]);
    possibilities.e = filterWith(possibilities.e, [1, 3, 4, 5, 7, 9]);
    possibilities.f = filterWith(possibilities.f, [2]);
    possibilities.g = filterWith(possibilities.g, [1, 4, 7]);

    for (let letter in possibilities) {
      if (possibilities[letter].length == 1) {
        for (let otherletter in possibilities) {
          if (otherletter != letter) {
            possibilities[otherletter] = possibilities[otherletter].filter(
              (x) => x != possibilities[letter][0]
            );
          }
        }
      }
    }

    return possibilities;
  }

  getValue(line: string): number {
    let sortFn = (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0);
    let dict = this.getDictionary(line);

    let mappedNumbers = this.numbersLookup.map((x) =>
      x
        .map((letter) => dict[letter][0])
        .sort(sortFn)
        .join("")
    );

    let numbers = line
      .split("|")[1]
      .split(" ")
      .filter(Boolean)
      .map((x) => x.split("").sort(sortFn).join(""));

    let output: string[] = [];

    for (const n of numbers) {
      for (let i = 0; i < 10; ++i) {
        if (mappedNumbers[i] == n) {
          output.push(i.toString());
          break;
        }
      }
    }

    return parseInt(output.join(""));
  }

  solveForPartTwo(input: string): string {
    const lines = input.split(/[\r\n]/g).filter(Boolean);

    return lines.reduce((sum, line) => sum + this.getValue(line), 0).toString();
  }
}

export default new Day8();
