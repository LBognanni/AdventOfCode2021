import { Day } from "../day";

class Day20 extends Day {
  constructor() {
    super(20);
  }

  parse(input: string): [string[], string[][]] {
    let lines = input.split(/[\r\n]+/).filter(Boolean);
    return [
      lines[0].split("").map((c) => (c == "#" ? "1" : "0")),
      lines.slice(1).map((x) => x.split("").map((c) => (c == "#" ? "1" : "0"))),
    ];
  }

  enhance(alg: string[], map: string[][], filler: string): string[][] {
    let result: string[][] = [];

    // add extra padding
    for (let y = 0; y < map.length; ++y) {
      map[y].unshift(filler);
      map[y].push(filler);
    }
    let blank = filler.repeat(map[0].length).split("");
    map.unshift(blank);
    map.push(blank);

    let readLine = (x: number, y: number) => {
      let start = x - 1;
      let end = x + 2;
      let padLeft = "";
      let padRight = "";
      if (x == 0) {
        padLeft = filler;
        start = x;
      } else if (x == map[y].length - 1) {
        padRight = filler;
        end = x + 1;
      }

      return padLeft + map[y].slice(start, end).join("") + padRight;
    };

    let neighboursNumber = (x: number, y: number): number => {
      let result = [];
      if (y == 0) {
        result.push(filler.repeat(3));
      } else {
        result.push(readLine(x, y - 1));
      }
      result.push(readLine(x, y));
      if (y == map.length - 1) {
        result.push(filler.repeat(3));
      } else {
        result.push(readLine(x, y + 1));
      }
      return parseInt(result.join(""), 2);
    };

    for (let y = 0; y < map.length; ++y) {
      let arr: string[] = [];
      for (let x = 0; x < map[y].length; ++x) {
        let i = neighboursNumber(x, y);
        arr.push(alg[i]);
      }
      result.push(arr);
    }

    return result;
  }

  solve(input: string, times: number): string {
    let [alg, map] = this.parse(input);

    for (let n = 0; n < times; ++n) {
      let filler = n == 0 ? "0" : n % 2 == 0 ? alg[parseInt(alg[0].repeat(9), 2)] : alg[0];
      map = this.enhance(alg, map, filler);
    }

    return map
      .reduce((acc, line) => {
        acc += line.reduce((acc2, c) => {
          acc2 += parseInt(c);
          return acc2;
        }, 0);
        return acc;
      }, 0)
      .toString();
  }

  solveForPartOne(input: string): string {
    return this.solve(input, 2);
  }

  solveForPartTwo(input: string): string {
    return this.solve(input, 50);
  }
}

export default new Day20();
