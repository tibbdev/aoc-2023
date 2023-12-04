var fs = require('fs');

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}
console.log("Advent of code 2023 - Day 3!");

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

console.log("Part 1 answer : " + 0);
console.log("Part 2 answer : " + 0);
