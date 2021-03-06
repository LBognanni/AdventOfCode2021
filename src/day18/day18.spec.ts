import day18 from "./index";

const example = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`;

describe("On Day 18", () => {
  it(`should tokenise strings`, () => {
    expect(day18.tokenise('[[[[[9,8],1],2],3],4]')).toMatchObject(["[","[","[","[","[",9,",",8,"]",",",1,"]",",",2,"]",",",3,"]",",",4,"]"]);
  })
  it(`should explode highly nested numbers`, () =>{

    expect(day18.reduce(day18.tokenise('[[[[[9,8],1],2],3],4]'))[0].join('')).toBe("[[[[0,9],2],3],4]");
    expect(day18.reduce(day18.tokenise('[7,[6,[5,[4,[3,2]]]]]'))[0].join('')).toBe("[7,[6,[5,[7,0]]]]");
    expect(day18.reduce(day18.tokenise('[[6,[5,[4,[3,2]]]],1]'))[0].join('')).toBe("[[6,[5,[7,0]]],3]");
    expect(day18.reduce(day18.tokenise('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'))[0].join('')).toBe("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
    expect(day18.reduce(day18.tokenise('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'))[0].join('')).toBe("[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
    
  })
  it('should also do it here', () => {
    expect(day18.reduce(day18.tokenise('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]'))[0].join('')).toBe("[[[[0,7],4],[15,[0,13]]],[1,1]]");
  })
  it(`should split high numbers`, () =>{
    expect(day18.reduce(day18.tokenise('[1,10]'))[0].join('')).toBe("[1,[5,5]]");
    expect(day18.reduce(day18.tokenise('[1,[1,11]]'))[0].join('')).toBe("[1,[1,[5,6]]]");
    expect(day18.reduce(day18.tokenise('[1,[11,1]]'))[0].join('')).toBe("[1,[[5,6],1]]");
    
  })
  it(`should add 2 numbers`, () => {
    expect(day18.addStrings('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]')).toBe("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
    expect(day18.addStrings('[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]', '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]')).toBe("[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]");
    expect(day18.addStrings('[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]', '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]')).toBe("[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]");
    expect(day18.addStrings('[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]', '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]')).toBe("[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]");
    expect(day18.addStrings('[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]', '[7,[5,[[3,8],[1,4]]]]')).toBe("[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]");
    expect(day18.addStrings('[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]', '[[2,[2,2]],[8,[8,1]]]')).toBe("[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]");
    expect(day18.addStrings('[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]', '[2,9]')).toBe("[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]");
    expect(day18.addStrings('[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]', '[1,[[[9,3],9],[[9,0],[0,7]]]]')).toBe("[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]");
    expect(day18.addStrings('[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]', '[[[5,[7,4]],7],1]')).toBe("[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]");
    expect(day18.addStrings('[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]', '[[[[4,2],2],6],[8,7]]')).toBe("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");
  });
  it(`should calculate the right magnitude`, () => {
    expect(day18.magnitude([[1,2],[[3,4],5]])).toBe(143);
    expect(day18.magnitude([[[[0,7],4],[[7,8],[6,0]]],[8,1]])).toBe(1384);
    expect(day18.magnitude([[[[1,1],[2,2]],[3,3]],[4,4]])).toBe(445);
    expect(day18.magnitude([[[[3,0],[5,3]],[4,4]],[5,5]])).toBe(791);
    expect(day18.magnitude([[[[5,0],[7,4]],[5,5]],[6,6]])).toBe(1137);
    expect(day18.magnitude([[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]])).toBe(3488);
  });
  it(`part 1 solves for the example input`, () => {
    expect(day18.solveForPartOne(example)).toBe("4140");
  });
  it(`part 2 solves for the example input`, () => {
    expect(day18.solveForPartTwo(example)).toBe("3993");
  });
});
