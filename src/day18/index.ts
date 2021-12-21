import { Day } from "../day";

type snailNumber = [number | snailNumber, number | snailNumber];
type FlatNumber = {
  parent: snailNumber;
  index: number;
  level: number;
  value: number | snailNumber;
};

type token = number | "," | "[" | "]";

class Day18 extends Day {
  constructor() {
    super(18);
  }

  tokenise(s: string): token[] {
    function toToken(s: string): token {
      if (["[", ",", "]"].includes(s)) return s as token;
      return parseInt(s, 10);
    }
    return s
      .split(/(\[)|(,)|([0-9]+)|(\])/)
      .filter(Boolean)
      .map(toToken);
  }

  reduce(tokens: token[]): [token[], boolean] {
    function findFirst(of: number, inc: number) {
      for (let i = of + inc; i >= 0 && i < tokens.length; i += inc) {
        if (typeof tokens[i] === "number") return i;
      }
      return -1;
    }

    let level = 0;
    for (let i = 0; i < tokens.length; ++i) {
      const token = tokens[i];
      switch (token) {
        case "[":
          level++;
          break;
        case "]":
          level--;
          break;
        case ",":
          break;
        default:
          if (level == 5) {
            let leftNumber = i;
            let rightNumber = i + 2; // i+1 would be the comma
            let leftNeighbour = findFirst(leftNumber, -1);
            let rightNeighbour = findFirst(rightNumber, 1);
            if (leftNeighbour >= 0) {
              tokens[leftNeighbour] =
                (tokens[leftNeighbour] as number) +
                (tokens[leftNumber] as number);
            }
            if (rightNeighbour >= 0) {
              tokens[rightNeighbour] =
                (tokens[rightNeighbour] as number) +
                (tokens[rightNumber] as number);
            }
            let newTokens = [
              ...tokens.slice(0, i - 1),
              ...[0],
              ...tokens.slice(i + 4),
            ];
            return [newTokens, true];
          }
          break;
      }
    }

    for (let i = 0; i < tokens.length; ++i) {
      const token = tokens[i];
      if (typeof token === "number") {
        let n = token as number;
        if (token > 9) {
          let newTokens = [
            ...tokens.slice(0, i),
            ...["[", Math.floor(n / 2), ",", Math.ceil(n / 2), "]"],
            ...tokens.slice(i + 1),
          ];
          return [newTokens as token[], true];
        }
      }
    }

    return [tokens, false];
  }

  addStrings(s1: string, s2: string): string {
    return this.add(this.tokenise(s1), this.tokenise(s2)).join("");
  }

  add(a: token[], b: token[]): token[] {
    let intermediate: token[] = [
      ...["[" as token],
      ...a,
      ...["," as token],
      ...b,
      ...["]" as token],
    ];
    let didSomething = false;
    do {
      [intermediate, didSomething] = this.reduce(intermediate);
    } while (didSomething);
    return intermediate;
  }

  magnitude(num: snailNumber): number {
    if (Array.isArray(num)) {
      return (
        this.magnitude(num[0] as snailNumber) * 3 +
        this.magnitude(num[1] as snailNumber) * 2
      );
    }
    return num;
  }

  magnitudeOfSum(numbers: token[][]): number {
    let result = numbers.shift()!;
    for (let thing of numbers) {
      result = this.add(result, thing);
    }
    let snailNumbers = JSON.parse(result.join(""));
    return this.magnitude(snailNumbers);
  }

  solveForPartOne(input: string): string {
    let stuff = input
      .split(/[\r\n]+/g)
      .filter(Boolean)
      .map((x) => this.tokenise(x));
    return this.magnitudeOfSum(stuff).toString();
  }

  solveForPartTwo(input: string): string {
    let stuff = input
      .split(/[\r\n]+/g)
      .filter(Boolean)
      .map((x) => this.tokenise(x));
    let biggestnumber = 0;
    for (const n1 of stuff) {
      for (const n2 of stuff) {
        let result = this.magnitudeOfSum([n1, n2]);
        biggestnumber = Math.max(biggestnumber, result);
      }
    }
    return biggestnumber.toString();
  }
}

export default new Day18();

//// FAILED PREVIUOUS ATTEMPTS AT REDUCE :((((((
//// Left here to commemorate the many hours spent head-desking
/*
  reduce3(snailNumbers: snailNumber): [snailNumber, boolean] {
    function flatten(num: snailNumber, level: number): FlatNumber[] {
      let arr: FlatNumber[] = [];

      for (let i = 0; i < 2; ++i) {
        if (
          Array.isArray(num[i]) &&
          (Array.isArray((num[i] as snailNumber)[0]) ||
            Array.isArray((num[i] as snailNumber)[1]))
        ) {
          for (let result of flatten(num[i] as snailNumber, level + 1)) {
            arr.push(result);
          }
        } else {
          arr.push({
            parent: num,
            index: i,
            level: Array.isArray(num[i]) ? level + 1 : level,
            value: num[i],
          });
        }
      }
      return arr;
    }
    let flattened = flatten(snailNumbers, 0);

    for (let i = 0; i < flattened.length; i++) {
      const el = flattened[i];
      if (el.level == 4) {
        if (i > 1) {
          let prev = flattened[i - 1];
          prev.parent[prev.index] =
            (prev.parent[prev.index] as number) +
            ((el.value as snailNumber)[0] as number);
        }
        if (i < flattened.length - 1) {
          let next = flattened[i + 1];
          next.parent[next.index] =
            (next.parent[next.index] as number) +
            ((el.value as snailNumber)[1] as number);
        }
        el.parent[el.index] = 0;

        return [snailNumbers, true];
      }
    }

    for (let i = 0; i < flattened.length; i++) {
      const el = flattened[i];
      if (Array.isArray(el.value)) {
        for (let j = 0; j < 2; ++j) {
          if (el.value[j] > 9) {
            el.value[j] = [
              Math.floor((el.value[j] as number) / 2),
              Math.ceil((el.value[j] as number) / 2),
            ];
            return [snailNumbers, true];
          }
        }
      } else {
        if (el.value > 9) {
          el.parent[el.index] = [
            Math.floor((el.value as number) / 2),
            Math.ceil((el.value as number) / 2),
          ];
          return [snailNumbers, true];
        }
      }
    }

    return [snailNumbers, false];
  }

  reduce2(snailNumbers: snailNumber): [snailNumber, boolean] {
    let didSomething = false;

    function findFirstExploder(arr: snailNumber, level: number): number[] {
      for (let i = 0; i < 2; ++i) {
        if (!Array.isArray(arr[i])) continue;

        if (level < 4) {
          let res = findFirstExploder(arr[i] as snailNumber, level + 1);
          if (res.length) {
            res.unshift(i);
            return res;
          }
        } else {
          return [i];
        }
      }
      return [];
    }

    function findNumber(map: number[], lvl: number): snailNumber {
      let n = snailNumbers;

      for (let i = 1; i <= lvl; ++i) {
        n = n[map[i]] as snailNumber;
      }
      return n;
    }

    function findFirstChild(num: snailNumber, direction: number): snailNumber {
      if (Array.isArray(num[direction])) {
        if (Array.isArray((num[direction] as snailNumber)[direction])) {
          return findFirstChild(num[direction] as snailNumber, direction);
        } else {
          return num[direction] as snailNumber;
        }
      }

      return num;
    }

    var chain = findFirstExploder(snailNumbers, 1);
    if (chain.length) {
      chain.unshift(2); // add "head"
      let leftParentIdx = -1;
      let rightParentIdx = -1;
      for (let i = chain.length - 1; i >= 0; --i) {
        if (chain[i] == 0 && rightParentIdx < 0) {
          rightParentIdx = i - 1;
        }
        if (chain[i] == 1 && leftParentIdx < 0) {
          leftParentIdx = i - 1;
        }
      }

      let parent = findNumber(chain, chain.length - 2);
      let child = findNumber(chain, chain.length - 1);
      if (leftParentIdx >= 0) {
        let leftParent = findNumber(chain, leftParentIdx);

        if (Array.isArray(leftParent[0])) {
          let leftSibling = findFirstChild(leftParent[0], 1);
          leftSibling[1] = (leftSibling[1] as number) + (child[0] as number);
          //if (typeof leftSibling[1] === "string") throw "oh no.";
        } else {
          leftParent[0] = (leftParent[0] as number) + (child[0] as number);
          //if (typeof leftParent[0] === "string") throw "oh no.";
        }
      }
      if (rightParentIdx >= 0) {
        let rightParent = findNumber(chain, rightParentIdx);
        if (Array.isArray(rightParent[1])) {
          let rightSibling = findFirstChild(rightParent[1], 0);
          //if (typeof rightSibling[0] != "number") throw "oh no.";
          rightSibling[0] = (rightSibling[0] as number) + (child[1] as number);
          //if (typeof rightSibling[0] === "string") throw "oh no.";
        } else {
          rightParent[1] = (rightParent[1] as number) + (child[1] as number);
          //if (typeof rightParent[1] === "string") throw "oh no.";
        }
      }
      parent[chain[chain.length - 1]] = 0;
      didSomething = true;
    } else {
      function split(arr: snailNumber) {
        if (didSomething) return;
        for (let i = 0; i < 2; ++i) {
          if (Array.isArray(arr[i])) {
            split(arr[i] as snailNumber);
          } else if (arr[i] > 9) {
            arr[i] = [
              Math.floor((arr[i] as number) / 2),
              Math.ceil((arr[i] as number) / 2),
            ];
            didSomething = true;
            break;
          }
        }
      }
      split(snailNumbers);
    }

    return [snailNumbers, didSomething];
  }
  */
