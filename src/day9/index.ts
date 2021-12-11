import { Day } from "../day";

class Day9 extends Day {
  constructor() {
    super(9);
  }

  solveForPartOne(input: string): string {
    const map = input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((line) => line.split("").map((x) => parseInt(x, 10)));
    let lowSum = 0;

    for (let x = 0; x < map[0].length; ++x) {
      for (let y = 0; y < map.length; ++y) {
        let nearby: number[] = [];
        if (x > 0) {
          nearby.push(map[y][x - 1]);
        }
        if (y > 0) {
          nearby.push(map[y - 1][x]);
        }
        if (x < map[0].length - 1) {
          nearby.push(map[y][x + 1]);
        }
        if (y < map.length - 1) {
          nearby.push(map[y + 1][x]);
        }

        if (map[y][x] < nearby.reduce((prev, cur) => Math.min(prev, cur), 10)) {
          lowSum += map[y][x] + 1;
        }
      }
    }

    return lowSum.toString();
  }

  solveForPartTwo(input: string): string {
    return "input";
  }
}

export default new Day9();
