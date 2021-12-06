import day6 from './index';

const example = `3,4,3,1,2`

describe('On Day 6', () =>{

    it(`ages fish correctly`, () => {
        expect(day6.ageFish([{days: 1, count: 2}, {days: 0, count: 3}]))
        .toMatchObject([{days: 0, count: 2}, {days: 6, count: 3}, {days: 8, count: 3}]);
    });
    it(`part1 solves for the example case`, ()=>{
        expect(day6.solveForPartOne(example)).toBe('5934');
    })
});