import { Day } from "../day";

class Day11 extends Day {
  constructor() {
    super(11);
  }

  getMap(input: string): number[][] {
    return input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((line) => line.split("").map((x) => parseInt(x, 10)));
  }

  runMap(map: number[][]): number {
    let flashes = 0;

    function flash(x: number, y: number) {
      if (x < 0 || y < 0 || x == map[0].length || y == map.length) return;
      if (map[y][x] > 9) return;
      map[y][x]++;
      if (map[y][x] > 9) {
        flashes++;

        flash(x - 1, y - 1);
        flash(x + 1, y - 1);
        flash(x, y - 1);

        flash(x - 1, y);
        flash(x + 1, y);

        flash(x - 1, y + 1);
        flash(x + 1, y + 1);
        flash(x, y + 1);
      }
    }

    function forEveryCell(fun: (x: number, y: number) => void) {
      for (let y = 0; y < map.length; ++y) {
        for (let x = 0; x < map[y].length; ++x) {
          fun(x, y);
        }
      }
    }

    forEveryCell((x, y) => flash(x, y));
    forEveryCell((x, y) => {
      if (map[y][x] > 9) {
        map[y][x] = 0;
      }
    });

    return flashes;
  }

  solveForPartOne(input: string): string {
    const map = this.getMap(input);
    let flashes = 0;
    for (let i = 0; i < 100; ++i) {
      flashes += this.runMap(map);
    }
    return flashes.toString();
  }

  solveForPartTwo(input: string): string {
    const map = this.getMap(input);
    const maxFlashes = map.length * map[0].length;

    for (let i = 1; i < 100000; ++i) {
      let flashes = this.runMap(map);
      if (flashes == maxFlashes) {
        return i.toString();
      }
    }

    return "error";
  }
}

export default new Day11();
