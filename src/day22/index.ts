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
      if (
        inst.x0 > 50 ||
        inst.y0 > 50 ||
        inst.z0 > 50 ||
        inst.x1 < -50 ||
        inst.y1 < -50 ||
        inst.z1 < -50
      )
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
    let instructions = this.parse(input);
    let areas: instruction[] = [instructions.shift()!];

    const splitAreas = (a: instruction, b: instruction): instruction[] => {
      if (
        a.x0 > b.x1 ||
        a.y0 > b.y1 ||
        a.z0 > b.z1 ||
        a.x1 < b.x0 ||
        a.y1 < b.y0 ||
        a.z1 < b.z0
      )
        return [a]; // they don't overlap

      let areas: instruction[] = [];
      if (a.x0 < b.x0) {
        areas.push({
          on: a.on,
          x0: a.x0,
          x1: b.x0 - 1,
          y0: a.y0,
          y1: a.y1,
          z0: a.z0,
          z1: a.z1,
        });
        a.x0 = b.x0;
      }
      if (a.y0 < b.y0) {
        areas.push({
          on: a.on,
          x0: a.x0,
          x1: a.x1,
          y0: a.y0,
          y1: b.y0 - 1,
          z0: a.z0,
          z1: a.z1,
        });
        a.y0 = b.y0;
      }
      if (a.z0 < b.z0) {
        areas.push({
          on: a.on,
          x0: a.x0,
          x1: a.x1,
          y0: a.y0,
          y1: a.y1,
          z0: a.z0,
          z1: b.z0 - 1,
        });
        a.z0 = b.z0;
      }
      if (a.x1 > b.x1) {
        areas.push({
          on: a.on,
          x0: b.x1 + 1,
          x1: a.x1,
          y0: a.y0,
          y1: a.y1,
          z0: a.z0,
          z1: a.z1,
        });
        a.x1 = b.x1;
      }
      if (a.y1 > b.y1) {
        areas.push({
          on: a.on,
          x0: a.x0,
          x1: a.x1,
          y0: b.y1 + 1,
          y1: a.y1,
          z0: a.z0,
          z1: a.z1,
        });
        a.y1 = b.y1;
      }
      if (a.z1 > b.z1) {
        areas.push({
          on: a.on,
          x0: a.x0,
          x1: a.x1,
          y0: a.y0,
          y1: a.y1,
          z0: b.z1 + 1,
          z1: a.z1,
        });
        a.z1 = b.z1;
      }
      return areas.filter(
        (el) => el.x0 <= el.x1 && el.y0 <= el.y1 && el.z0 <= el.z1
      );
    };

    for (const inst of instructions) {
      let newAreas: instruction[] = [inst];

      for (const a of areas) {
        newAreas = [...newAreas, ...splitAreas(a, inst)];
      }

      areas = newAreas.filter(a=>a.on);
    }

    return areas
      .reduce((acc, cur) => {
        acc += (cur.x1 - cur.x0 + 1) * (cur.y1 - cur.y0 + 1) * (cur.z1 - cur.z0 + 1);
        return acc;
      }, 0)
      .toString();
  }
}

export default new Day22();
