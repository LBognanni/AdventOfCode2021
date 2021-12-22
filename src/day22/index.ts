import { Day } from "../day";

type instruction = {
  on: boolean;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
};

type cube = {
  x: number;
  y: number;
  z: number;
  on: boolean;
};

const toKey = (c: cube): string => `${c.x},${c.y},${c.z}`;

class Day22 extends Day {
  constructor() {
    super(22);
  }

  parse(input: string): instruction[] {
    return input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => {
        let match = line.match(
          /(on|off) x=([\-0-9]+)..([\-0-9]+),y=([\-0-9]+)..([\-0-9]+),z=([\-0-9]+)..([\-0-9]+)/
        )!;
        return {
          on: match[1] === "on",
          x0: parseInt(match[2], 10),
          x1: parseInt(match[3], 10),
          y0: parseInt(match[4], 10),
          y1: parseInt(match[5], 10),
          z0: parseInt(match[6], 10),
          z1: parseInt(match[7], 10),
        };
      });
  }

  solveForPartOne(input: string): string {
    let instructions = this.parse(input);
    let cubes: Map<string, cube> = new Map();

    for (const inst of instructions) {
      if( 
        (inst.x0 > 50)||
        (inst.y0 > 50)||
        (inst.z0 > 50)||
        (inst.x1 < -50)||
        (inst.y1 < -50)||
        (inst.z1 < -50))
        continue;


      for (let x = inst.x0; x <= inst.x1; ++x) {
        for (let y = inst.y0; y <= inst.y1; ++y) {
          for (let z = inst.z0; z <= inst.z1; ++z) {
            let key = `${x},${y},${z}`;
            let c = cubes.get(key);
            if (c) {
              c.on = inst.on;
            } else {
              cubes.set(key, { x: x, y: y, z: z, on: inst.on });
            }
          }
        }
      }
    }

    return [...cubes.values()]
      .filter(
        (x) =>
          x.on &&
          Math.abs(x.x) <= 50 &&
          Math.abs(x.y) <= 50 &&
          Math.abs(x.z) <= 50
      )
      .length.toString();
  }

  solveForPartTwo(input: string): string {
    return 'input';
  }
}

export default new Day22();
