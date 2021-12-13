import { Day } from "../day";

type Point = {
  x: number;
  y: number;
};

type Page = {
  points: Point[];
  width: number;
  height: number;
};

type Instruction = {
  axis: string;
  d: number;
};

type Puzzle = {
  page: Page;
  instructions: Instruction[];
};

class Day13 extends Day {
  constructor() {
    super(13);
  }

  makePage(points: Point[]): Page {
    return {
      points,
      width: points.reduce((acc, cur) => Math.max(acc, cur.x), 0),
      height: points.reduce((acc, cur) => Math.max(acc, cur.y), 0),
    };
  }

  parsePuzzle(input: string): Puzzle {
    const lines = input.split(/[\r\n]/gi).filter(Boolean);
    let points: Point[] = [];
    let instructions: Instruction[] = [];

    const ptRgx = /[0-9]+,[0-9]+/;
    for (const line of lines) {
      if (ptRgx.test(line)) {
        let coords = line.split(",").map((x) => parseInt(x, 10));
        points.push({ x: coords[0], y: coords[1] });
      } else {
        var match = line.match(/fold along ([xy])=([0-9]+)/) ?? [];
        instructions.push({ axis: match[1], d: parseInt(match[2], 10) });
      }
    }
    return {
      page: this.makePage(points),
      instructions,
    };
  }

  fold(page: Page, instruction: Instruction): Page {
    const f = (x: number) =>
      x < instruction.d ? x : x - (x - instruction.d) * 2;
    const flipX = (pt: Point) => ({ x: f(pt.x), y: pt.y });
    const flipY = (pt: Point) => ({ x: pt.x, y: f(pt.y) });
    const flip = instruction.axis === "x" ? flipX : flipY;

    return this.makePage(
      page.points
        .map((p) => flip(p))
        .reduce((acc, cur) => {
          if (acc.filter((p) => p.x == cur.x && p.y == cur.y).length == 0) {
            acc.push(cur);
          }
          return acc;
        }, [] as Point[])
    );
  }

  solveForPartOne(input: string): string {
    const puzzle = this.parsePuzzle(input);
    const result = this.fold(puzzle.page, puzzle.instructions[0]);
    return result.points.length.toString();
  }

  render(page: Page): string {
    const lines: string[] = [];

    for (let y = 0; y <= page.height; ++y) {
      const line: string[] = [];
      for (let x = 0; x <= page.width; ++x) {
        if (page.points.filter((p) => p.x == x && p.y == y).length == 0) {
          line.push(" ");
        } else {
          line.push("#");
        }
      }
      lines.push(line.join(""));
    }

    return lines.join("\n");
  }

  solveForPartTwo(input: string): string {
    const puzzle = this.parsePuzzle(input);
    let page = puzzle.page;
    for (const instr of puzzle.instructions) {
      page = this.fold(page, instr);
    }
    return this.render(page);
  }
}

export default new Day13();
