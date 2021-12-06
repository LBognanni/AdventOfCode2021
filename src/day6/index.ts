import { count } from "console";
import { Day } from "../day";

type fishGroup = {
  days: number;
  count: number;
};

class Day6 extends Day {
  constructor() {
    super(6);
  }

  ageFish(zipFish: fishGroup[]): fishGroup[] {
    let arr: fishGroup[] = [];
    let newBorns = 0;

    for (let group of zipFish) {
      let days = group.days - 1;
      if (days == -1) {
        days = 6;
        newBorns += group.count;
      }
      arr.push({
        count: group.count,
        days: days,
      });
    }

    arr.push({days: 8, count: newBorns});

    return arr;
  }

  solve(input:string, days: number):string {
    let zipFish: fishGroup[] = Object.entries(
      input.split(",").reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    ).map((arr) => ({ days: parseInt(arr[0], 10), count: arr[1] }));

    for (let day = 0; day < days; ++day) {
      zipFish = this.ageFish(zipFish);
    }

    return zipFish.reduce((acc, cur) => acc + cur.count, 0).toString();
  }

  solveForPartOne(input: string): string {
      return this.solve(input, 80);
  }

  solveForPartTwo(input: string): string {
    return this.solve(input, 256);
  }
}

export default new Day6();
