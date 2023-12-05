var fs = require('fs');

console.log("Advent of code 2023 - Day 5!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}
function part1_impl(data)
{
    return 0;
}

function part2_impl(data)
{
    return 0;
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

console.log("Part 1 answer : " + part1_impl(file_data));
console.log("Part 2 answer : " + part2_impl(file_data));
