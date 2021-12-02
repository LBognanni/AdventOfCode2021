import { Day } from "../day";

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    let x = 0;
    let y = 0;

    const dict: { [id: string]: (arg0: number) => void } = {
      forward: (n) => (x += n),
      down: (n) => (y += n),
      up: (n) => (y -= n),
    };

    input
      .split(`\n`)
      .filter((x) => x != "")
      .forEach((line) => {
        var parts = line.split(" ");
        dict[parts[0]](parseInt(parts[1], 10));
      });

    return (x * y).toString();
  }

  solveForPartTwo(input: string): string {
    let x = 0;
    let y = 0;
    let aim = 0;

    const dict: { [id: string]: (arg0: number) => void } = {
      forward: (n) => {
        x += n;
        y += n * aim;
      },
      down: (n) => (aim += n),
      up: (n) => (aim -= n),
    };

    input
      .split(`\n`)
      .filter((x) => x != "")
      .forEach((line) => {
        var parts = line.split(" ");
        dict[parts[0]](parseInt(parts[1], 10));
      });

    return (x * y).toString();
  }
}

export default new Day2();
