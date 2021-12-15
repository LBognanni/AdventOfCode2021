import { Day } from "../day";

type Point = {
  parent: string | null;
  x: number;
  y: number;
  cost: number;
  distE: number;
};

class Day15 extends Day {
  constructor() {
    super(15);
  }

  a_star(map: number[][]): number {
    let start: Point = {
      x: 0,
      y: 0,
      cost: 0,
      parent: null,
      distE: 0,
    };
    let end: Point = {
      x: map[0].length - 1,
      y: map.length - 1,
      cost: 0,
      distE: 0,
      parent: null,
    };
    let seen: Map<string, Point> = new Map();
    let notSeen = [start];

    const distFrom = (x: number, y: number, pt: Point): number =>
      Math.sqrt((x - pt.x) * (x - pt.x) + (y - pt.y) * (y - pt.y));

    function makePoint(x: number, y: number, c: Point): Point {
      return {
        x: x,
        y: y,
        parent: [c.x, c.y].join(","),
        cost: c.cost + map[y][x],
        distE: distFrom(x, y, end),
      };
    }

    while (notSeen.length) {
      //@ts-ignore
      let current: Point = notSeen.shift();
      seen.set([current.x, current.y].join(","), current);

      if (current.x == end.x && current.y == end.y) {
        break;
      }

      let neighbours: Point[] = [];
      if (current.x > 0)
        neighbours.push(makePoint(current.x - 1, current.y, current));
      if (current.x < end.x)
        neighbours.push(makePoint(current.x + 1, current.y, current));
      if (current.y > 0)
        neighbours.push(makePoint(current.x, current.y - 1, current));
      if (current.y < end.y)
        neighbours.push(makePoint(current.x, current.y + 1, current));

      for (const neighbour of neighbours) {
        let seenPt = seen.get([neighbour.x, neighbour.y].join(","));
        if (seenPt) {
          if (seenPt.cost > neighbour.cost) {
            seen.set([neighbour.x, neighbour.y].join(","), neighbour);
          }
          continue;
        }
        if (
          notSeen.filter((x) => x.x == neighbour.x && x.y == neighbour.y)
            .length > 0
        ) {
          continue;
        }
        notSeen.push(neighbour);
      }
      notSeen = notSeen.sort((a: Point, b: Point) =>
        a.cost == b.cost ? a.distE - b.distE : a.cost - b.cost
      );
    }

    let pos = [end.x, end.y].join(",");
    return seen.get(pos)?.cost ?? 0;
  }

  solveForPartOne(input: string): string {
    const map = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((x) => x.split("").map((y) => parseInt(y, 10)));

    return this.a_star(map).toString();
  }

  makeBigMap(map: number[][]): number[][] {
    function clamp(x: number) {
      while (x > 9) x -= 9;
      return x;
    }

    let bigMap: number[][] = [];
    let w = map[0].length;
    let h = map.length;
    for (let y = 0; y < 5; ++y) {
      for (let x = 0; x < 5; ++x) {
        for (let my = 0; my < h; ++my) {
          bigMap[y * h + my] ??= [];
          for (let mx = 0; mx < w; ++mx) {
            bigMap[y * h + my][x * w + mx] = clamp(map[mx][my] + x + y);
          }
        }
      }
    }
    return bigMap;
  }

  solveForPartTwo(input: string): string {
    const map = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((x) => x.split("").map((y) => parseInt(y, 10)));

    let bigMap = this.makeBigMap(map);

    return this.a_star(bigMap).toString();
  }
}

export default new Day15();
