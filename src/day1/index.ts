import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    countIncreases(lines: number[]){
        let count = 0;
        for(let i = 1; i< lines.length; ++i)
        {
            if(lines[i] > lines[i-1])
            {
                count++;
            }
        }

        return count.toString();
    }

    solveForPartOne(input: string): string {
        const lines = input.split('\n').map(x => parseInt(x, 10));
        return this.countIncreases(lines);
    }

    solveForPartTwo(input: string): string {

        const lines = input.split('\n').map(x => parseInt(x, 10));
        let groups: number[] = [];

        lines.forEach((line, i) =>{
            if(i > 1)
                groups [i - 1] += line;
            if(i > 2)
                groups[i-2] += line;
            groups[i] = line;
        });
        
        return this.countIncreases(groups);
    }
}

export default new Day1;