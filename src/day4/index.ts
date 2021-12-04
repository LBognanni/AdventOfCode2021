import { Day } from "../day";

interface boardPiece {
  x: number;
  y: number;
  mark: boolean;
  num: number;
}

type board = {
  hasWon: boolean;
  pieces: boardPiece[];
};
type puzzle = {
  draws: number[];
  boards: board[];
};

type winner = {
  board: board;
  index: number;
};

class Day4 extends Day {
  constructor() {
    super(4);
  }

  parsePuzzle(input: string): puzzle {
    const lines = input.replace(/\r/g, "").split("\n");
    let boards: board[] = [];
    let currentBoard: board = { pieces: [], hasWon: false };
    let y = 0;

    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      if (line === "") {
        if (currentBoard.pieces.length) {
          boards.push(currentBoard);
        }
        currentBoard = { pieces: [], hasWon: false };
        y = 0;
        continue;
      }
      currentBoard.pieces = currentBoard.pieces.concat(
        line
          .split(/\s/)
          .filter(Boolean)
          .map((n, i) => ({
            x: i,
            y: y,
            mark: false,
            num: parseInt(n, 10),
          }))
      );
      y++;
    }

    if (currentBoard.pieces.length) {
      boards.push(currentBoard);
    }

    return {
      draws: lines[0]
        .split(",")
        .filter(Boolean)
        .map((x) => parseInt(x, 10)),
      boards: boards,
    };
  }

  playPuzzle(puzzle: puzzle, index: number): winner | null {
    let drawIdx = index;
    let winner: winner | null = null;
    for (const draw of puzzle.draws.slice(index)) {
      for (let board of puzzle.boards) {
        if (board.hasWon) continue;

        for (let item of board.pieces) {
          if (item.num === draw) {
            item.mark = true;
            break;
          }
        }

        for (let i = 0; i < 5; ++i) {
          if (
            board.pieces
              .filter((item) => item.x == i)
              .every((item) => item.mark) ||
            board.pieces
              .filter((item) => item.y == i)
              .every((item) => item.mark)
          ) {
            board.hasWon = true;
            winner = {
              board: board,
              index: drawIdx,
            };
          }
        }
      }
      if (winner) break;
      drawIdx++;
    }

    return winner;
  }

  solveForPartOne(input: string): string {
    var puzzle = this.parsePuzzle(input);

    const winner = this.playPuzzle(puzzle, 0);

    if (winner) {
      return (
        winner.board.pieces
          .filter((x) => !x.mark)
          .reduce((prev, cur) => prev + cur.num, 0) * puzzle.draws[winner.index]
      ).toString();
    }
    return "noone wins";
  }

  solveForPartTwo(input: string): string {
    var puzzle = this.parsePuzzle(input);
    let lastWinner: winner | null = null;
    let index: number = 0;

    while (!puzzle.boards.every((board) => board.hasWon)) {
      lastWinner = this.playPuzzle(puzzle, index);
      if (lastWinner) {
        index = lastWinner.index + 1;
      }
    }

    if (!lastWinner) {
      return "noone wins";
    }

    return (
      lastWinner.board.pieces
        .filter((x) => !x.mark)
        .reduce((prev, cur) => prev + cur.num, 0) *
      puzzle.draws[lastWinner.index]
    ).toString();
  }
}

export default new Day4();
