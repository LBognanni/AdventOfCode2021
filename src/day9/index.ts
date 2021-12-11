import { Day } from "../day";

type Point = {
  x: number;
  y: number;
};

class Day9 extends Day {
  constructor() {
    super(9);
  }

  getMap(input: string): number[][] {
    return input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((line) => line.split("").map((x) => parseInt(x, 10)));
  }

  getLowPoints(map: number[][]): Point[] {
    let arr: Point[] = [];

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
          arr.push({ x, y });
        }
      }
    }

    return arr;
  }

  solveForPartOne(input: string): string {
    const map = this.getMap(input);

    return this.getLowPoints(map)
      .reduce((acc, p) => {
        acc += map[p.y][p.x] + 1;
        return acc;
      }, 0)
      .toString();
  }

  getBasinSize(map: number[][], pt: Point): number {
    let points: Point[] = [];

    function getBasin(pt: Point) {
      if (pt.x < 0 || pt.y < 0 || pt.x == map[0].length || pt.y == map.length)
        return;
      if (map[pt.y][pt.x] == 9) return;
      if (points.filter((p) => p.x == pt.x && p.y == pt.y).length > 0) return;
      points.push(pt);
      getBasin({ x: pt.x - 1, y: pt.y });
      getBasin({ x: pt.x + 1, y: pt.y });
      getBasin({ x: pt.x, y: pt.y - 1 });
      getBasin({ x: pt.x, y: pt.y + 1 });
    }

    getBasin(pt);

    return points.length;
  }

  solveForPartTwo(input: string): string {
    let map = this.getMap(input);
    let lowPoints = this.getLowPoints(map);

    return lowPoints
      .map((pt) => this.getBasinSize(map, pt))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, cur) => {
        acc *= cur;
        return acc;
      }, 1)
      .toString();
  }
}

export default new Day9();
