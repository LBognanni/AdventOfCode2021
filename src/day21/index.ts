import { Day } from "../day";

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
      rounds+=3;
      
      if (player1Score >= 1000) break;

      player2Pos = rollPlayer(player2Pos);
      player2Score += player2Pos;
      rounds+=3;
    }

    return (Math.min(player1Score, player2Score) * rounds).toString();
  }

  solveForPartTwo(input: string): string {
    return 'input';
  }
}

export default new Day21();
