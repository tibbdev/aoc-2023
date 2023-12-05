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

function get_seed_soil_map(data)
{
    let seed_soil_map = [];

    let done = false;
    let started = false;
    data.forEach(line =>
        {
            if (done)
            {
                console.log("done");
                return seed_soil_map;
            }
            else if(started)
            {
                if (line === "")
                {
                    done = true;
                }
                else
                {
                    console.log("getting map data");
                    let seed_soil = [];
                    line.split(" ").forEach(val =>
                        {
                            seed_soil.push(parseInt(val));
                        })
                    seed_soil_map.push(seed_soil);
                }
            }
            else if (line.includes("seed-to-soil"))
            {
                console.log("found map start...");
                started = true;
            }
        });

    return [];
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
seedsoil_map = get_seed_soil_map(file_data);
console.log(seeds);
console.log(seedsoil_map);

console.log("Part 1 answer : " + part1_impl(file_data));
console.log("Part 2 answer : " + part2_impl(file_data));
