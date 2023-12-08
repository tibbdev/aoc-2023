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

function strip_double_spaces(str)
{
    let old_str = str;

    while (old_str != old_str.replace("  ", " ")) {
        old_str = old_str.replace("  ", " ")
    }

    return old_str;
}

let data = [];

file_data.forEach(line =>
    {
        let stripped_line = strip_double_spaces(line);
        let line_split = stripped_line.split(" ");

        let d = [];

        for (let i = 1; i < line_split.length; i++)
        {
            d.push(parseInt(line_split[i]));
        }

        data.push(d);
    });

let race_count = data[0].length;

let record_beaters = [];
for (let i = 0; i < race_count; i++)
{
    let beat_count = 0;
    for (let speed = 0; speed < data[0][i]; speed++)
    {
        let move_time = data[0][i] - speed;

        if(0 < move_time)
        {
            let distance = speed * move_time;

            if(data[1][i] < distance)
            {
                beat_count++;
            }
        }
    }
    record_beaters.push(beat_count);
}

let error_margin = 1;

record_beaters.forEach(winners =>
    {
        error_margin *= winners;
    })

console.log("Part 1: ", error_margin);
