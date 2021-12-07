import { Day } from "../day";

class Day7 extends Day {
  constructor() {
    super(7);
  }

  solveForPartOne(input: string): string {
    const values = input
      .split(/,/g)
      .filter(Boolean)
      .map((x) => parseInt(x, 10));

    const positions = Object.keys(
      values.reduce((acc, cur) => {
        acc[cur] = 0;
        return acc;
      }, {} as { [key: number]: number })
    ).map((x) => parseInt(x, 10));
    
    let minMovements = Number.MAX_VALUE;

    for (const pos of positions) {
      const movements = values.reduce(
        (acc, cur) => acc + Math.abs(pos - cur),
        0
      );
      if (movements < minMovements) minMovements = movements;
    }

    return minMovements.toString();
  }

  solveForPartTwo(input: string): string {
    return "input";
  }
}

export default new Day7();
