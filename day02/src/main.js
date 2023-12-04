var fs = require('fs');

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(filename)));
    let split_data = file_data.split("\n");
    return split_data;
}

console.log("Advent of code 2023 - Day 2!");

// Read filename as extra argument
let filename = process.argv[2];
// console.log("Input File : " + filename);

// Read input file
let file_data = read_file(filename);
console.log("File Content :\n");
file_data.forEach(element => {
    console.log("   " + element);
});

