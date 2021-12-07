import { Day } from "./day";
import day0 from "./day0/index";
import day1 from "./day1/index";
import day2 from "./day2/index";
import day3 from "./day3/index";
import day4 from "./day4/index";
import day5 from "./day5/index";
import day6 from "./day6/index";
import day7 from "./day7/index";
// MORE IMPORTS HERE
const days: Day[] = [
  day0,
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  // MORE DAYS HERE
];

async function runDay(day: Day) {
  
  console.log(`
🎄 Day ${day.id}
-----------
`);

  const resultPart1 = await day.partOne();
  console.log("Part 1 result:\n");
  console.log(resultPart1);

  console.log("\n");

  const resultPart2 = await day.partTwo();
  console.log("Part 2 result:\n");
  console.log(resultPart2);
}

async function runAllDays() {
  for (const day of days) {
    await runDay(day);
  }
}

console.log("\n\n\n   ADVENT OF CODE 2021 \n\n");
const params = process.argv.splice(2);
if (params.length) {
  if (params[0] == "all") {
    runAllDays();
  } else {
    runDay(days[parseInt(params[0], 10)]);
  }
} else {
  console.log(`Usage: npm run start [day]`);
  console.log(`Available days: [ ${days.map((x) => x.id).join(", ")} ]`);
}
