import { Day } from "../day";

type Vector = [number, number, number];
let vectorMinus = (a:Vector, b:Vector): Vector => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
let vectorPlus = (a:Vector, b:Vector): Vector => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
let vectorsEqual = (a:Vector, b:Vector): boolean => (
  a[0] == b[0] &&
  a[1] == b[1] &&
  a[2] == b[2] 
);
let matrixMult = (a:Vector, m: number[][]): Vector =>[
  m[0][0] * a[0] + m[1][0] * a[1] + m[2][0] * a[2],
  m[0][1] * a[0] + m[1][1] * a[1] + m[2][1] * a[2],
  m[0][2] * a[0] + m[1][2] * a[1] + m[2][2] * a[2]
];


class Point {
  public Position: Vector;
  private _superPositions: Vector[];

  constructor(x: number, y: number, z: number) {
    this.Position = [x, y, z];
    this._superPositions = [];
  }

  public asComparable():string {
    let [x, y, z] = this.Position;
    return `(${x},${y},${z})`;
  }

  public getSuperPosition(index: number): Vector {
    if(this._superPositions.length){
      return this._superPositions[index];
    }
    return matrixMult(this.Position, rotationMatrices[index]);
  }

  public getSuperPositions(): Vector[] {
    let pos = this.Position;
    function inner() {
      let arr: Vector[] = [];

      for (const m of rotationMatrices) {
        arr.push(matrixMult(pos, m));
      }

      return arr;
    }
    if (!this._superPositions.length) {
      this._superPositions = inner();
    }
    return this._superPositions;
  }
}

type Scanner = {
  beacons: Point[];
  location: Point;
  id: number;
  fingerprint: number[][];
};

class Day19 extends Day {
  constructor() {
    super(19);
  }

  parse(input: string): Scanner[] {
    let lines = input.split(/[\r\n]+/g).filter(Boolean);
    let scanners: Scanner[] = [];
    let scanner: Scanner | null = null;
    let scannerId: number = 0;

    for (let line of lines) {
      if (line.startsWith("---")) {
        if (scanner) {
          scanners.push(scanner);
        }
        scanner = {
          id: scannerId,
          beacons: [],
          location: new Point(0, 0, 0),
          fingerprint: [],
        };
        scannerId++;
      } else {
        let xyz = line.split(",").map((x) => parseInt(x, 10));
        scanner?.beacons.push(new Point(xyz[0], xyz[1], xyz[2]));
      }
    }
    if (scanner) {
      scanners.push(scanner);
    }

    return scanners;
  }

  // Fingerprint is the distance between each beacon and every other beacon
  calculateFingerprint(beacons: Vector[]): number[][] {
    let fingerprint = [];
    for (const pt1 of beacons) {
      let arr: number[] = [];
      for (const pt2 of beacons) {
        arr.push(
          (pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) +
          (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]) +
          (pt1[2] - pt2[2]) * (pt1[2] - pt2[2])
        );
      }
      fingerprint.push(arr);
    }
    return fingerprint;
  }

  matchPositions(unknown: Scanner, known: Scanner): boolean {
    if (known.fingerprint.length === 0) {
      known.fingerprint = this.calculateFingerprint(
        known.beacons.map((x) => x.Position)
      );
    }
    if (unknown.fingerprint.length === 0) {
      unknown.fingerprint = this.calculateFingerprint(
        unknown.beacons.map((x) => x.Position)
      );
    }

    let matchingFingerprints: [number, number, number][] = [];

    for (let iUnknown = 0; iUnknown < unknown.fingerprint.length; iUnknown++) {
      const elU = unknown.fingerprint[iUnknown];
      for (let iKnown = 0; iKnown < known.fingerprint.length; ++iKnown) {
        let elK = known.fingerprint[iKnown];
        let numMatches:number = 0;
        for(let unknownDist of elU){
          if(elK.includes(unknownDist))
          {
            numMatches++;
          }
        }
        if (numMatches >= 12) {
          matchingFingerprints.push([iUnknown, iKnown, numMatches]);
        }
      }
    }

    // matchingFingerprints will be a list of [unknownBeaconIndex, knownBeaconIndex, [number of matches]], sorted by number of matches
    if(matchingFingerprints.length >=12){
      matchingFingerprints = matchingFingerprints.sort((a,b) => b[2]-a[2]);
      // match a triangle
      let triangle = matchingFingerprints.slice(0, 3);
      let unknownPermutations = triangle.map(t=> unknown.beacons[t[0]].getSuperPositions());
      let knownPlacement = triangle.map(t=> known.beacons[t[1]].Position);
      for(let iPerm = 0;iPerm<24;++iPerm){
        let diff:Vector = vectorMinus(knownPlacement[0], unknownPermutations[0][iPerm]);
        if(
          vectorsEqual(knownPlacement[1], vectorPlus(diff, unknownPermutations[1][iPerm])) &&
          vectorsEqual(knownPlacement[2], vectorPlus(diff, unknownPermutations[2][iPerm])))
          {
            // We have the right rotation! Now align all the points 
            unknown.location.Position = vectorPlus(unknown.location.getSuperPosition(iPerm), diff);
            for(let beacon of unknown.beacons){
              beacon.Position = vectorPlus(beacon.getSuperPosition(iPerm), diff);
            }

            return true;
          }
      }
    }
    return false;
  }

  solveForPartOne(input: string): string {
    let scanners = this.parse(input);
    let knownScanners = [scanners.shift()!];
    let unknownScanners = scanners;

    // match all scanners
    while (unknownScanners.length) {
      let scanner = unknownScanners.shift()!;
      let found = false;
      for (const known of knownScanners) {
        if (this.matchPositions(scanner, known)) {
          found = true;
          knownScanners.push(scanner);
          break;
        }
      }
      if (!found) {
        // unlucky, try again next time :(
        unknownScanners.push(scanner);
      }
    }

    let allThePoints = new Set(
      knownScanners.flatMap((x) => x?.beacons.map((b) => b.asComparable()))
    );

    return [...allThePoints].length.toString();
  }

  solveForPartTwo(input: string): string {
    return 'input';
  }
}

export default new Day19();


// prettier-ignore
const rotationMatrices = [
  [[ 1, 0, 0,],[ 0, 1, 0,],[ 0, 0, 1,],],
  [[ 1, 0, 0,],[ 0, 0,-1,],[ 0, 1, 0,],],
  [[ 1, 0, 0,],[ 0,-1, 0,],[ 0, 0,-1,],],
  [[ 1, 0, 0,],[ 0, 0, 1,],[ 0,-1, 0,],],
  [[ 0,-1, 0,],[ 1, 0, 0,],[ 0, 0, 1,],],
  [[ 0, 0, 1,],[ 1, 0, 0,],[ 0, 1, 0,],],
  [[ 0, 1, 0,],[ 1, 0, 0,],[ 0, 0,-1,],],
  [[ 0, 0,-1,],[ 1, 0, 0,],[ 0,-1, 0,],],
  [[-1, 0, 0,],[ 0,-1, 0,],[ 0, 0, 1,],],
  [[-1, 0, 0,],[ 0, 0,-1,],[ 0,-1, 0,],],
  [[-1, 0, 0,],[ 0, 1, 0,],[ 0, 0,-1,],],
  [[-1, 0, 0,],[ 0, 0, 1,],[ 0, 1, 0,],],
  [[ 0, 1, 0,],[-1, 0, 0,],[ 0, 0, 1,],],
  [[ 0, 0, 1,],[-1, 0, 0,],[ 0,-1, 0,],],
  [[ 0,-1, 0,],[-1, 0, 0,],[ 0, 0,-1,],],
  [[ 0, 0,-1,],[-1, 0, 0,],[ 0, 1, 0,],],
  [[ 0, 0,-1,],[ 0, 1, 0,],[ 1, 0, 0,],],
  [[ 0, 1, 0,],[ 0, 0, 1,],[ 1, 0, 0,],],
  [[ 0, 0, 1,],[ 0,-1, 0,],[ 1, 0, 0,],],
  [[ 0,-1, 0,],[ 0, 0,-1,],[ 1, 0, 0,],],
  [[ 0, 0,-1,],[ 0,-1, 0,],[-1, 0, 0,],],
  [[ 0,-1, 0,],[ 0, 0, 1,],[-1, 0, 0,],],
  [[ 0, 0, 1,],[ 0, 1, 0,],[-1, 0, 0,],],
  [[ 0, 1, 0,],[ 0, 0,-1,],[-1, 0, 0,],],      
];
