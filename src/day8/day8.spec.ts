import day8 from "./index";

const example = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

describe("On Day 8", () => {
    it(`part 1 solves for the example input`, () => {
      expect(day8.solveForPartOne(example)).toBe("26");
    });

    it(`part 2 solves for a single line`, () => {
        expect(day8.getDictionary(`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`)).toMatchObject({
            "a": ["d"],
            "b": ["e"],
            "c": ["a"],
            "d": ["f"],
            "e": ["g"],
            "f": ["b"],
            "g": ["c"]
        });
    });

    it(`part 2 gets the right value on  a single line`, () => {
        expect(day8.getValue(`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`)).toBe(5353);
    });
    it(`part 2 gets the right value on  a different line`, () => {
        expect(day8.getValue(`edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc`)).toBe(9781);
    });

    it(`part 2 solves for the example input`, () => {
        expect(day8.solveForPartTwo(example)).toBe("61229");
      });
  });
