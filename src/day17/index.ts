import { Day } from "../day";

type box = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

class Day17 extends Day {
  constructor() {
    super(17);
  }

  parseBox(input: string): box {
    const rgx =
      /target area: x=([\-0-9]+)\.\.([\-0-9]+), y=([\-0-9]+)..([\-0-9]+)/;
    const result = input.match(rgx);
    if (!result) {
      throw "Can't parse input";
    }
    return {
      left: Math.min(parseInt(result[1]), parseInt(result[2])),
      right: Math.max(parseInt(result[1]), parseInt(result[2])),
      bottom: Math.min(parseInt(result[3]), parseInt(result[4])),
      top: Math.max(parseInt(result[3]), parseInt(result[4])),
    };
  }

  hitIsInTarget(target: box, mx: number, my: number): [boolean, number] {
    let x = 0,
      y = 0,
      maxY = target.bottom;
    for (;;) {
      x += mx;
      y += my;
      maxY = Math.max(maxY, y);
      if (
        x >= target.left &&
        x <= target.right &&
        y >= target.bottom &&
        y <= target.top
      ) {
        return [true, maxY];
      } else if (x > target.right || y < target.bottom) {
        return [false, 0];
      }
      mx--;
      if (mx < 0) mx = 0;
      my--;
    }
  }

  solveForPartOne(input: string): string {
    const target = this.parseBox(input);

    let maxY = target.bottom;
    for (let mx = 1; mx < target.right; ++mx) {
      for (let my = 0; my < 1000; ++my) {
        let [hits, height] = this.hitIsInTarget(target, mx, my);
        if (hits) {
          maxY = Math.max(maxY, height);
        }
      }
    }

    return maxY.toString();
  }

  solveForPartTwo(input: string): string {
    const target = this.parseBox(input);

    let nHits = 0;
    for (let mx = 1; mx <= target.right; ++mx) {
      for (let my = target.bottom; my < 1000; ++my) {
        let [hits, _] = this.hitIsInTarget(target, mx, my);
        if (hits) {
          nHits++;
        }
      }
    }

    return nHits.toString();
  }
}

export default new Day17();
