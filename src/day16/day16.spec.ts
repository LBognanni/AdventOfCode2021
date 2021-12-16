import day16 from "./index";

describe("On Day 16", () => {
  it(`Can parse a type 4 packet`, ()=>{
    expect(day16.parseBinary('110100101111111000101000')[0]).toMatchObject({
      version: 6,
      id: 4,
      content: 2021,
      subPackets: []
    });
  });
  it(`Can parse a packet with sub-packets in bitlength`, ()=>{
    expect(day16.parseBinary('00111000000000000110111101000101001010010001001000000000')[0]).toMatchObject({
      version: 1,
      id: 6,
      content: 0,
      subPackets: [
        { version: 6, id: 4, content: 10, subPackets: []},
        { version: 2, id: 4, content: 20, subPackets: []},
      ]
    });
  });
  it(`Can parse a packet with sub-packets in packetlength`, ()=>{
    expect(day16.parseBinary('11101110000000001101010000001100100000100011000001100000')[0]).toMatchObject({
      version: 7,
      id: 3,
      content: 0,
      subPackets: [
        { version: 2, id: 4, content: 1, subPackets: []},
        { version: 4, id: 4, content: 2, subPackets: []},
        { version: 1, id: 4, content: 3, subPackets: []},
      ]
    });
  });
  it(`can parse hex into binary`, () => {
    expect(day16.hex2bin('D2FE28')).toBe('110100101111111000101000');
  });
  it(`part 1 solves for operator packet`, () => {
    expect(day16.solveForPartOne("8A004A801A8002F478")).toBe("16");
    expect(day16.solveForPartOne("620080001611562C8802118E34")).toBe("12");
    expect(day16.solveForPartOne("C0015000016115A2E0802F182340")).toBe("23");
    expect(day16.solveForPartOne("A0016C880162017C3686B18A3D4780")).toBe("31");
  });

  it(`part 2 solvers for various types of packets`, () => {
    expect(day16.solveForPartTwo('C200B40A82')).toBe('3');
    expect(day16.solveForPartTwo('04005AC33890')).toBe('54');
    expect(day16.solveForPartTwo('880086C3E88112')).toBe('7');
    expect(day16.solveForPartTwo('CE00C43D881120')).toBe('9');
    expect(day16.solveForPartTwo('D8005AC2A8F0')).toBe('1');
    expect(day16.solveForPartTwo('F600BC2D8F')).toBe('0');
    expect(day16.solveForPartTwo('9C005AC2F8F0')).toBe('0');
    expect(day16.solveForPartTwo('9C0141080250320F1802104A08')).toBe('1');
  })
});
