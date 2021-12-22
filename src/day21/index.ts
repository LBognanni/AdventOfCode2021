import { Day } from "../day";

type posAndScore = [number, number, number, number, number];

class Day21 extends Day {
  constructor() {
    super(21);
  }

  parse(input: string): [number, number] {
    let lines = input.split(/[\r\n]+/).filter(Boolean);
    return [
      parseInt(lines[0].substring(lines[0].length - 1)),
      parseInt(lines[1].substring(lines[1].length - 1)),
    ];
  }

  solveForPartOne(input: string): string {
    let [player1Pos, player2Pos] = this.parse(input);
    let player1Score = 0;
    let player2Score = 0;
    let die = 0;
    let rounds = 0;

    let roll = () => {
      die++;
      if (die > 100) die = 1;
      return die;
    };

    let roll3 = () => roll() + roll() + roll();
    let rollPlayer = (pos: number) => {
      pos += roll3();
      while (pos > 10) {
        pos -= 10;
      }
      return pos;
    };

    while (player1Score < 1000 && player2Score < 1000) {
      player1Pos = rollPlayer(player1Pos);
      player1Score += player1Pos;
      rounds += 3;

      if (player1Score >= 1000) break;

      player2Pos = rollPlayer(player2Pos);
      player2Score += player2Pos;
      rounds += 3;
    }

    return (Math.min(player1Score, player2Score) * rounds).toString();
  }

  solveForPartTwo(input: string): string {
    let [player1Pos, player2Pos] = this.parse(input);
    let universes: posAndScore[] = [[player1Pos, player2Pos, 0, 0, 1]];
    const rollsAndFrequencies = [
      [3, 1],
      [4, 3],
      [5, 6],
      [6, 7],
      [7, 6],
      [8, 3],
      [9, 1],
    ];
    let games = 0;

    let play = (
      game: posAndScore,
      index: number,
      newUniverses: posAndScore[],
      cacheIndex: { [key: string]: number }
    ): number => {
      let wins = 0;
      for (const [roll, frequency] of rollsAndFrequencies) {
        let item = game.slice() as posAndScore;
        item[index] += roll;
        while (item[index] > 10) {
          item[index] -= 10;
        }
        item[index + 2] += item[index];
        item[4] *= frequency;

        if (item[index + 2] >= 21) {
          wins += item[4];
        } else {
          let itemStr = item.slice(0, 4).join();
          let i = cacheIndex[itemStr];
          if (typeof i == "number") {
            newUniverses[i][4] += item[4];
          } else {
            cacheIndex[itemStr] = newUniverses.length;
            newUniverses.push(item);
          }
        }
      }
      return wins;
    };

    let totalWins = [0, 0];
    while (universes.length) {
      for (let iPlayer = 0; iPlayer < 2; ++iPlayer) {
        let newUniverses: posAndScore[] = [];
        let index = {};
        for (const uni of universes) {
          totalWins[iPlayer] += play(uni, iPlayer, newUniverses, index);
          games += rollsAndFrequencies.length;
        }
        universes = newUniverses;
      }
    }

    return totalWins[0].toString();
  }
}

export default new Day21();
