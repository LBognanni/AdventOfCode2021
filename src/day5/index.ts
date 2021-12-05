import { Day } from "../day";

type Point = {
  x: number;
  y: number;
};

type Line = {
  p1: Point;
  p2: Point;
};

class Day5 extends Day {
  constructor() {
    super(5);
  }

  parsePoints(input: string): Line[] {
    const textLines = input.split(/[\r\n]/).filter(Boolean);
    const regex = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/;
    return textLines.map((l) => {
      let match = l.match(regex);
      if (!match || match.length < 5) throw `no matches for ${l}`;
      return {
        p1: {
          x: parseInt(match[1], 10),
          y: parseInt(match[2], 10),
        },
        p2: {
          x: parseInt(match[3], 10),
          y: parseInt(match[4], 10),
        },
      };
    });
  }

  public *expandLine(line: Line): Generator<Point> {
    if (line.p1.x == line.p2.x) {
      for (
        let y = Math.min(line.p1.y, line.p2.y);
        y <= Math.max(line.p1.y, line.p2.y);
        ++y
      ) {
        yield { x: line.p1.x, y };
      }
    } else if (line.p1.y == line.p2.y) {
      for (
        let x = Math.min(line.p1.x, line.p2.x);
        x <= Math.max(line.p1.x, line.p2.x);
        ++x
      ) {
        yield { x, y: line.p1.y };
      }
    }
  }

  solveForPartOne(input: string): string {
    const lines = this.parsePoints(input);

    const allPoints = lines.flatMap((l) => [...this.expandLine(l)]);

    let groups = allPoints.reduce((acc, pt) => {
      acc[`${pt.x},${pt.y}`] = (acc[`${pt.x},${pt.y}`] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.values(groups)
      .filter((x) => x >= 2)
      .length.toString();
  }

  solveForPartTwo(input: string): string {
    return "input";
  }
}

export default new Day5();
