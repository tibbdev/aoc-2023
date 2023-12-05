var fs = require('fs');

console.log("Advent of code 2023 - Day 5!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function get_seeds(data)
{
    let seeds = [];

    data[0].split(": ")[1].split(" ").forEach(seed_str => {
        seeds.push(parseInt(seed_str));
    });

    return seeds;
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

seeds = get_seeds(file_data);
console.log(seeds);

console.log("Part 1 answer : " + part1_impl(file_data));
console.log("Part 2 answer : " + part2_impl(file_data));
