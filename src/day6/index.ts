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

    for (let group of zipFish) {
      let days = group.days - 1;
      if (days == -1) {
        days = 6;
        arr.push({
          days: 8,
          count: group.count,
        });
      }
      arr.push({
        count: group.count,
        days: days,
      });
    }

    return arr;
  }

  solveForPartOne(input: string): string {
    let zipFish: fishGroup[] = Object.entries(
      input.split(",").reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    ).map((arr) => ({ days: parseInt(arr[0], 10), count: arr[1] }));

    for (let day = 0; day < 80; ++day) {
      zipFish = this.ageFish(zipFish);
    }

    return zipFish.reduce((acc, cur) => acc + cur.count, 0).toString();
  }

  solveForPartTwo(input: string): string {
    return "input";
  }
}

export default new Day6();
