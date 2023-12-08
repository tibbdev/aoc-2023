var fs = require('fs');

console.log("Advent of code 2023 - Day 6!");

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

file_data.forEach(line =>
    {
        let old_line = line;
        while (old_line != old_line.replace("  ", " ")) {
            old_line = old_line.replace("  ", " ")
        }
        let line_split = old_line.split(" ");
        console.log(line_split, " len: ",line_split.length)
    });
