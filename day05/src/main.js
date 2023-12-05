var fs = require('fs');

console.log("Advent of code 2023 - Day 5!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function split_input_file(input)
{
    let seeds_list = [];
    let map_builder = {"name": "", "data": []};

    let outputs = [];

    for (let idx = 0; idx < input.length; idx++)
    {
        if (input[idx].includes("seeds: "))
        {
            // these are the seeds...
            let stripped_str = input[idx].replace("seeds: " , "");
            stripped_str.split(" ").forEach(v =>
                {
                    seeds_list.push(parseInt(v));
                })
        }
        else if(input[idx].includes(" map:"))
        {
            map_builder.name = input[idx].replace(" map:", "");
        }
        else if (input[idx] === "")
        {
            console.log("SEEDS: ", seeds_list);
            console.log("MAP: ", map_builder);
            outputs = [];

            seeds_list.forEach(seed => {
                let out = seed;

                map_builder.data.forEach(seed_map =>
                    {
                        if ((seed >= seed_map.s) && (seed < (seed_map.s + seed_map.r))) // if within range
                        {
                            let diff = seed - seed_map.s;
                            out = seed_map.d + diff;
                        }
                    });
                
                outputs.push(out);

            });

            console.log("OUT: ", outputs);
            console.log("===---###---===");

            seeds_list = outputs;

            // clear map_builder variable
            map_builder.name = "?";
            map_builder.data = [];
        }
        else
        {
            let split_line = input[idx].split(" ");
            let dest = parseInt(split_line[0]);
            let source = parseInt(split_line[1]);
            let range = parseInt(split_line[2]);

            map_builder["data"].push({"s":source,"d":dest,"r":range});
        }
    }

    return outputs;
}

function part1_impl(data)
{
    organised_data = split_input_file(data);

    // console.log(organised_data)

    let min_value = NaN;
    organised_data.forEach(value =>
        {
            if (isNaN(min_value))
            {
                min_value = value;
            }
            else
            {
                if(value < min_value)
                {
                    min_value = value;
                }
            }
        })

    return min_value;
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
