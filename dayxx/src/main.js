var fs = require('fs');

console.log("Advent of code 2023 - Day xx!");

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path), 'utf-8'));
    let split_data = file_data.split("\r\n");
    return split_data;
}

console.log(file_data);
