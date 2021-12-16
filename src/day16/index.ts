import { Day } from "../day";

type Packet = {
  id: number;
  version: number;
  content: number;
  subPackets: Packet[];
};

class Day16 extends Day {
  constructor() {
    super(16);
  }

  parseBinary(input: string): [Packet, number] {
    let version = parseInt(input.slice(0, 3), 2);
    let id = parseInt(input.slice(3, 6), 2);

    if (id === 4) {
      let bytes = "";
      let start = 6;
      while (start <= input.length - 5) {
        const bits = input.slice(start, start + 5);
        bytes = bytes + bits.slice(1);
        start += 5;
        if (bits[0] === "0") {
          break;
        }
      }
      return [
        {
          content: parseInt(bytes, 2),
          id: id,
          version: version,
          subPackets: [],
        },
        start,
      ];
    } else {
      let bitsRead = 7;
      let lengthId = input.slice(6, 7);
      let subPackets = [];
      if (lengthId == "0") {
        let subLength = parseInt(input.slice(7, 7 + 15), 2);
        bitsRead += subLength + 15;
        let substr = input.slice(7 + 15, 7 + 15 + subLength);
        while (substr.length > 0) {
          var [packet, len] = this.parseBinary(substr);
          if (len < 6) break;
          subPackets.push(packet);
          substr = substr.slice(len);
        }
      } else {
        let numberOfSubPackets = parseInt(input.slice(7, 7 + 11), 2);
        let substr = input.slice(7 + 11);
        bitsRead += 11;
        for (let i = 0; i < numberOfSubPackets; ++i) {
          var [packet, len] = this.parseBinary(substr);
          subPackets.push(packet);
          substr = substr.slice(len);
          bitsRead += len;
        }
      }
      return [
        {
          content: 0,
          id: id,
          version: version,
          subPackets: subPackets,
        },
        bitsRead,
      ];
    }
  }

  hex2bin(input: string): string {
    return input
      .split("")
      .map((x) => parseInt(x, 16).toString(2).padStart(4, "0"))
      .join("");
  }

  solveForPartOne(input: string): string {
    let binaryInput = this.hex2bin(input);
    var packet = this.parseBinary(binaryInput)[0];

    function countVersions(packet: Packet): number {
      return packet.subPackets.reduce((acc, cur) => {
        acc += countVersions(cur);
        return acc;
      }, packet.version);
    }

    return countVersions(packet).toString();
  }

  solveForPartTwo(input: string): string {
    let binaryInput = this.hex2bin(input);
    var packet = this.parseBinary(binaryInput)[0];

    function runPacket(packet: Packet): number {
      switch (packet.id) {
        case 4: // number
          return packet.content;
        case 0: // *
          return packet.subPackets.reduce((acc, cur) => {
            acc += runPacket(cur);
            return acc;
          }, 0);
        case 1: // *
          return packet.subPackets.reduce((acc, cur) => {
            acc *= runPacket(cur);
            return acc;
          }, 1);
        case 2: // Min
          return packet.subPackets.reduce((acc, cur) => {
            acc = Math.min(runPacket(cur), acc);
            return acc;
          }, Number.MAX_SAFE_INTEGER);
        case 3: // Max
          return packet.subPackets.reduce((acc, cur) => {
            acc = Math.max(runPacket(cur), acc);
            return acc;
          }, Number.MIN_SAFE_INTEGER);
        case 5: // >
          return runPacket(packet.subPackets[0]) >
            runPacket(packet.subPackets[1])
            ? 1
            : 0;
        case 6: // <
          return runPacket(packet.subPackets[0]) <
            runPacket(packet.subPackets[1])
            ? 1
            : 0;
        case 7: // ==
          return runPacket(packet.subPackets[0]) ==
            runPacket(packet.subPackets[1])
            ? 1
            : 0;
      }
      throw "Packet id incorrect";
    }

    return runPacket(packet).toString();
  }
}

export default new Day16();
