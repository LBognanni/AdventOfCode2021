import { Day } from "../day";

function isLowerCase(input: string): boolean {
  return /^[a-z]+$/g.test(input);
}

class Day12 extends Day {
  constructor() {
    super(12);
  }

  getConnections(input: string): { [key: string]: string[] } {
    return input
      .split(/[\r\n]/g)
      .filter(Boolean)
      .map((l) => l.split("-"))
      .reduce((acc, cur) => {
        acc[cur[0]] = acc[cur[0]] ?? [];
        if (!acc[cur[0]].includes(cur[1])) {
          acc[cur[0]].push(cur[1]);
        }
        acc[cur[1]] = acc[cur[1]] ?? [];
        if (!acc[cur[1]].includes(cur[0])) {
          acc[cur[1]].push(cur[0]);
        }
        return acc;
      }, {} as { [key: string]: string[] });
  }

  solveForPartOne(input: string): string {
    const connections = this.getConnections(input);
    let paths: string[][] = [];

    function connect(pt: string, path: string[]) {
      if (!connections[pt]) return;
      for (const sub of connections[pt]) {
        if (isLowerCase(sub) && path.includes(sub)) {
          continue;
        }
        let subPath = path.slice();
        subPath.push(sub);
        if (sub === "end") {
          paths.push(subPath);
          continue;
        }
        connect(sub, subPath);
      }
    }

    connect("start", ["start"]);

    return paths.length.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day12();
