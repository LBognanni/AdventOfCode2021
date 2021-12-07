import { Day } from "../day";

class Day7 extends Day {
  constructor() {
    super(7);
  }

  getValues(input: string): number[] {
    return input
      .split(/,/g)
      .filter(Boolean)
      .map((x) => parseInt(x, 10));
  }

  solve(input: string, method: (dist: number) => number): string {
    const values = this.getValues(input);
    const maxValue = values.reduce((prev, cur) => Math.max(prev, cur));
    const minValue = values.reduce((prev, cur) => Math.min(prev, cur));

    let minMovements = Number.MAX_VALUE;

    for (let pos = minValue; pos <= maxValue; ++pos) {
      const movements = values.reduce(
        (acc, cur) => acc + method(Math.abs(pos - cur)),
        0
      );
      if (movements < minMovements) minMovements = movements;
    }

    return minMovements.toString();
  }

  solveForPartOne(input: string): string {
    return this.solve(input, (x) => x);
  }

  lookup: { [key: number]: number } = {};

  fuelDistance(val: number): number {
    if (val <= 1) {
      return val;
    }

    if (this.lookup[val]) {
      return this.lookup[val];
    }

    const result = val + this.fuelDistance(val - 1);
    this.lookup[val] = result;
    return result;
  }

  solveForPartTwo(input: string): string {
    return this.solve(input, (x) => this.fuelDistance(x));
  }
}

export default new Day7();
